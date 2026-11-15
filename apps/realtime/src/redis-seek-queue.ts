import Redis from "ioredis";
import type { SeekEntry } from "./matchmaking.js";

const KEY = "eduforge:chess:seek";

/**
 * Cross-instance seek queue.
 * Redis when available; in-memory fallback for local single-process dev/tests.
 */
export class SeekQueueStore {
  private memory: SeekEntry[] = [];

  constructor(private redis: Redis | null) {}

  get backend(): "redis" | "memory" {
    return this.redis ? "redis" : "memory";
  }

  async list(): Promise<SeekEntry[]> {
    if (!this.redis) return [...this.memory];
    const raw = await this.redis.lrange(KEY, 0, -1);
    return raw.map((s) => JSON.parse(s) as SeekEntry);
  }

  async replaceAll(entries: SeekEntry[]): Promise<void> {
    if (!this.redis) {
      this.memory = [...entries];
      return;
    }
    const multi = this.redis.multi();
    multi.del(KEY);
    if (entries.length) {
      multi.rpush(KEY, ...entries.map((e) => JSON.stringify(e)));
    }
    await multi.exec();
  }

  /**
   * Atomic pair attempt:
   * 1) Drop existing seeks for this user
   * 2) Find first matching opponent (same timeControl + rated)
   * 3) If found: remove opponent, return them
   * 4) Else: enqueue seeker and return null
   */
  async tryMatch(seeker: SeekEntry): Promise<SeekEntry | null> {
    if (!this.redis) {
      this.memory = this.memory.filter((s) => s.userId !== seeker.userId);
      const idx = this.memory.findIndex(
        (s) =>
          s.timeControl === seeker.timeControl &&
          s.rated === seeker.rated &&
          s.userId !== seeker.userId,
      );
      if (idx >= 0) {
        const [opp] = this.memory.splice(idx, 1);
        return opp;
      }
      this.memory.push(seeker);
      return null;
    }

    // Lua for atomic multi-instance matchmaking
    const script = `
local key = KEYS[1]
local seeker = cjson.decode(ARGV[1])
local list = redis.call('LRANGE', key, 0, -1)
local filtered = {}
for i = 1, #list do
  local s = cjson.decode(list[i])
  if s['userId'] ~= seeker['userId'] then
    table.insert(filtered, list[i])
  end
end
local matchIdx = 0
local matchJson = nil
for i = 1, #filtered do
  local s = cjson.decode(filtered[i])
  local ratedOk = (s['rated'] and seeker['rated']) or ((not s['rated']) and (not seeker['rated']))
  if s['timeControl'] == seeker['timeControl'] and ratedOk then
    matchIdx = i
    matchJson = filtered[i]
    break
  end
end
redis.call('DEL', key)
if matchJson then
  for i = 1, #filtered do
    if i ~= matchIdx then
      redis.call('RPUSH', key, filtered[i])
    end
  end
  return matchJson
else
  for i = 1, #filtered do
    redis.call('RPUSH', key, filtered[i])
  end
  redis.call('RPUSH', key, ARGV[1])
  return false
end
`;
    const result = await this.redis.eval(script, 1, KEY, JSON.stringify(seeker));
    if (!result || result === false) return null;
    return JSON.parse(String(result)) as SeekEntry;
  }

  async removeUser(userId: string): Promise<void> {
    const all = await this.list();
    await this.replaceAll(all.filter((s) => s.userId !== userId));
  }

  async removeSocket(socketId: string): Promise<void> {
    const all = await this.list();
    await this.replaceAll(all.filter((s) => s.socketId !== socketId));
  }
}

export function createRedisClient(url: string | undefined): Redis | null {
  if (!url) return null;
  try {
    const client = new Redis(url, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: false,
    });
    client.on("error", (err) => {
      console.warn("[realtime redis]", err.message);
    });
    return client;
  } catch (e) {
    console.warn("[realtime redis] init failed", e);
    return null;
  }
}
