"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";
import { MonacoCodeEditor } from "@/components/monaco-editor";
import { Badge, Button, Card } from "@/components/ui";

const RT = process.env.NEXT_PUBLIC_REALTIME_URL ?? "http://localhost:4001";

type ChatMsg = { userId: string; displayName: string; body: string; ts: number };
type Presence = { userId: string; displayName: string; event: string };

/**
 * Live collaborative classroom — Socket.IO class_* events.
 */
export default function LiveClassroomPage() {
  const { classId } = useParams<{ classId: string }>();
  const { user, character, token, loading } = useAuth();
  const { locale } = useLocale();
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [peers, setPeers] = useState<Presence[]>([]);
  const [code, setCode] = useState("// collaborate here\nconsole.log('class');\n");
  const [remoteNote, setRemoteNote] = useState("");
  const [text, setText] = useState("");
  const [hands, setHands] = useState<string[]>([]);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!token || !classId) return;
    const s = io(RT, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      auth: typeof token === "string" && token !== "cookie" ? { token } : {},
    });
    s.on("connect", () => {
      s.emit("class_join", {
        classId,
        displayName: character?.displayName,
      });
    });
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

  if (loading || !user) return <p>…</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-black">
          📡 {title} · <span className="font-mono text-sm">{classId}</span>
        </h1>
        <Badge tone="sky">{peers.length + 1} online</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 space-y-3">
          <p className="text-xs font-bold text-ink-muted">
            {locale === "en" ? "Shared buffer (last-write-wins)" : "Спільний код"}
            {remoteNote ? ` · ${remoteNote}` : ""}
          </p>
          <MonacoCodeEditor
            value={code}
            onChange={(v) => {
              setCode(v);
              socket?.emit("class_code", { classId, code: v, lang: "javascript" });
            }}
            language="javascript"
            height="320px"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => socket?.emit("class_raise_hand", { classId, up: true })}
            >
              ✋ {locale === "en" ? "Raise hand" : "Рука"}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => socket?.emit("class_raise_hand", { classId, up: false })}
            >
              {locale === "en" ? "Lower" : "Опустити"}
            </Button>
          </div>
          {hands.length > 0 && (
            <p className="text-sm font-bold text-grape">
              ✋ {hands.join(", ")}
            </p>
          )}
        </Card>

        <Card className="space-y-3 flex flex-col max-h-[480px]">
          <h2 className="font-black">{locale === "en" ? "Chat" : "Чат"}</h2>
          <div className="flex-1 space-y-2 overflow-y-auto text-sm">
            {chat.map((m, i) => (
              <div key={`${m.ts}-${i}`} className="rounded-xl bg-slate-50 p-2 dark:bg-slate-900">
                <p className="text-[10px] font-bold text-ink-muted">{m.displayName}</p>
                <p className="font-bold whitespace-pre-wrap">{m.body}</p>
              </div>
            ))}
            {!chat.length && (
              <p className="text-ink-muted font-bold text-sm">
                {locale === "en" ? "No messages yet" : "Повідомлень ще немає"}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="input flex-1"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && text.trim()) {
                  socket?.emit("class_chat", { classId, body: text.trim() });
                  setText("");
                }
              }}
            />
            <Button
              size="sm"
              onClick={() => {
                if (!text.trim()) return;
                socket?.emit("class_chat", { classId, body: text.trim() });
                setText("");
              }}
            >
              →
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
