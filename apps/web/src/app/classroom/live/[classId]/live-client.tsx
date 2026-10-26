"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { Badge, Button, Card } from "@/components/ui";
import { PageLoading } from "@/components/page-loading";
import { useRequireAuth } from "@/lib/use-require-auth";
import { setPlayMatchActive } from "@/lib/play-match";

const RT = process.env.NEXT_PUBLIC_REALTIME_URL ?? "http://localhost:4001";

type ChatMsg = { userId: string; displayName: string; body: string; ts: number };
type Presence = { userId: string; displayName: string; event: string };

/**
 * Live collaborative classroom — Socket.IO class_* events.
 * Labs surface (discover via ?labs=1).
 */
export function ClassroomLiveClient() {
  const { classId } = useParams<{ classId: string }>();
  const { user, character, token, loading } = useAuth();
  const { ready } = useRequireAuth();
  const { locale, t } = useLocale();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [peers, setPeers] = useState<Presence[]>([]);
  const [code, setCode] = useState("// collaborate here\nconsole.log('class');\n");
  const [remoteNote, setRemoteNote] = useState("");
  const [text, setText] = useState("");
  const [hands, setHands] = useState<string[]>([]);
  const [handUp, setHandUp] = useState(false);
  /** Outbound chat/code while disconnected — flushed on reconnect */
  const [pendingChat, setPendingChat] = useState<string[]>([]);
  const [reconnects, setReconnects] = useState(0);

  // Hide sticky Continue over live collab UI
  useEffect(() => {
    setPlayMatchActive(true);
    return () => setPlayMatchActive(false);
  }, []);

  useEffect(() => {
    if (!token || !classId) return;
    const s = io(RT, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 12,
      reconnectionDelay: 800,
      auth: typeof token === "string" && token !== "cookie" ? { token } : {},
    });
    s.on("connect", () => {
      setConnected(true);
      s.emit("class_join", {
        classId,
        displayName: character?.displayName,
      });
      // Flush buffered chat
      setPendingChat((buf) => {
        for (const body of buf) {
          s.emit("class_chat", { classId, body });
        }
        return [];
      });
    });
    s.on("disconnect", () => setConnected(false));
    s.on("reconnect", () => setReconnects((n) => n + 1));
    s.on("class_chat", (m: ChatMsg) => setChat((c) => [...c.slice(-80), m]));
    s.on("class_presence", (p: Presence) => {
      setPeers((list) => {
        if (p.event === "leave") return list.filter((x) => x.userId !== p.userId);
        if (list.some((x) => x.userId === p.userId)) return list;
        return [...list, p];
      });
    });
    s.on(
      "class_code",
      (p: { userId: string; displayName: string; code: string }) => {
        if (p.userId === user?.id) return;
        setCode(p.code);
        setRemoteNote(`${p.displayName} edited`);
      },
    );
    s.on("class_raise_hand", (p: { userId: string; displayName: string; up: boolean }) => {
      setHands((h) =>
        p.up
          ? [...new Set([...h, p.displayName])]
          : h.filter((n) => n !== p.displayName),
      );
    });
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, [token, classId, character?.displayName, user?.id]);

  const title = useMemo(
    () => (locale === "en" ? "Live classroom" : "Живий клас"),
    [locale],
  );

  if (loading || !ready) return <PageLoading label={t.common.loading} />;
  if (!user) return <PageLoading label={t.common.loading} />;

  function sendChat() {
    const body = text.trim();
    if (!body) return;
    if (!socket || !connected) {
      setPendingChat((b) => [...b.slice(-20), body]);
      setText("");
      return;
    }
    socket.emit("class_chat", { classId, body });
    setText("");
  }

  function pushCode(next: string) {
    setCode(next);
    socket?.emit("class_code", { classId, code: next });
  }

  function toggleHand() {
    const up = !handUp;
    setHandUp(up);
    socket?.emit("class_raise_hand", { classId, up });
  }

  return (
    <div className="space-y-4 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-black">
              📡 {title} ·{" "}
              <span className="font-mono text-sm font-bold">{classId}</span>
            </h1>
            <Badge tone="muted">Labs</Badge>
          </div>
          <p className="text-xs font-bold text-ink-muted">
            {locale === "en"
              ? "Socket.IO collab buffer + chat (last-write-wins)."
              : "Спільний буфер + чат через Socket.IO (last-write-wins)."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={connected ? "brand" : "muted"}>
            {connected
              ? locale === "en"
                ? "Connected"
                : "Онлайн"
              : locale === "en"
                ? "Connecting…"
                : "Зʼєднання…"}
          </Badge>
          {pendingChat.length > 0 && (
            <Badge tone="grape">
              {locale === "en"
                ? `${pendingChat.length} queued`
                : `${pendingChat.length} у черзі`}
            </Badge>
          )}
          {reconnects > 0 && (
            <Badge tone="muted">
              {locale === "en" ? `reconn ×${reconnects}` : `перепідкл ×${reconnects}`}
            </Badge>
          )}
          <Badge tone="sky">
            {peers.length + 1} {locale === "en" ? "online" : "у класі"}
          </Badge>
          <Link href="/schools" className="btn-secondary min-h-11 !py-2 text-sm">
            ← {t.nav.schools}
          </Link>
        </div>
      </div>

      {hands.length > 0 && (
        <p className="rounded-xl bg-sun/15 px-3 py-2 text-sm font-bold text-sun" role="status">
          ✋ {hands.join(", ")}
        </p>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-3 lg:col-span-2">
          <p className="text-xs font-bold text-ink-muted">
            {locale === "en" ? "Shared buffer" : "Спільний код"}
            {remoteNote ? ` · ${remoteNote}` : ""}
          </p>
          <MonacoCodeEditor
            value={code}
            onChange={pushCode}
            language="javascript"
            height="360px"
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => toggleHand()}
            aria-pressed={handUp}
          >
            {handUp
              ? locale === "en"
                ? "Lower hand"
                : "Опустити руку"
              : locale === "en"
                ? "Raise hand"
                : "Підняти руку"}
          </Button>
        </Card>

        <Card className="flex max-h-[480px] flex-col space-y-3">
          <h2 className="font-black">
            {locale === "en" ? "Class chat" : "Чат класу"}
          </h2>
          <ul
            className="min-h-0 flex-1 space-y-2 overflow-y-auto text-sm"
            aria-live="polite"
            aria-relevant="additions"
          >
            {chat.length === 0 && (
              <li className="font-bold text-ink-muted">
                {locale === "en" ? "No messages yet" : "Повідомлень ще немає"}
              </li>
            )}
            {chat.map((m, i) => (
              <li key={`${m.ts}-${i}`} className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                <p className="text-xs font-black text-ink-muted">{m.displayName}</p>
                <p className="font-bold whitespace-pre-wrap">{m.body}</p>
              </li>
            ))}
          </ul>
          <div className="flex gap-2">
            <label className="sr-only" htmlFor="class-chat-input">
              Chat
            </label>
            <input
              id="class-chat-input"
              className="input flex-1"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendChat();
                }
              }}
              placeholder={locale === "en" ? "Message…" : "Повідомлення…"}
            />
            <Button type="button" variant="primary" onClick={() => sendChat()}>
              →
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
