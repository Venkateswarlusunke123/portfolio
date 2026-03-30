"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, MessageCircle, Bot, Sun, Moon } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── Theme tokens ──────────────────────────────────────────────────────────────
const DARK = {
  window:      "rgba(3,13,7,0.97)",
  windowBorder:"rgba(0,217,126,0.2)",
  windowShadow:"0 0 0 1px rgba(0,217,126,0.08), 0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(124,58,237,0.12)",
  header:      "linear-gradient(90deg,rgba(124,58,237,0.15) 0%,rgba(0,217,126,0.1) 100%)",
  headerBorder:"rgba(0,217,126,0.12)",
  titleText:   "#e2e8f0",
  resetText:   "#64748b",
  closeText:   "#94a3b8",
  messages:    "transparent",
  scrollbar:   "rgba(0,217,126,0.2) transparent",
  aiBubbleBg:  "rgba(0,217,126,0.06)",
  aiBubbleBdr: "rgba(0,217,126,0.14)",
  aiBubbleTxt: "#e2e8f0",
  boldColor:   "#e2e8f0",
  listAccent:  "#00d97e",
  inputBorder: "rgba(0,217,126,0.1)",
  inputText:   "#e2e8f0",
  inputCaret:  "#00d97e",
  inputPlaceholder: "text-slate-600",
  inactiveSend:"rgba(255,255,255,0.05)",
  dotColor:    "#00d97e",
  onlineColor: "#00d97e",
  toggleBg:    "rgba(255,255,255,0.06)",
  toggleText:  "#94a3b8",
};

const LIGHT = {
  window:      "rgba(255,255,255,0.98)",
  windowBorder:"rgba(124,58,237,0.2)",
  windowShadow:"0 0 0 1px rgba(124,58,237,0.08), 0 24px 64px rgba(0,0,0,0.18), 0 0 40px rgba(0,217,126,0.08)",
  header:      "linear-gradient(90deg,rgba(124,58,237,0.08) 0%,rgba(0,217,126,0.06) 100%)",
  headerBorder:"rgba(124,58,237,0.1)",
  titleText:   "#1e293b",
  resetText:   "#94a3b8",
  closeText:   "#64748b",
  messages:    "#f8fafc",
  scrollbar:   "rgba(124,58,237,0.2) transparent",
  aiBubbleBg:  "#f1f5f9",
  aiBubbleBdr: "#e2e8f0",
  aiBubbleTxt: "#1e293b",
  boldColor:   "#0f172a",
  listAccent:  "#7c3aed",
  inputBorder: "#e2e8f0",
  inputText:   "#1e293b",
  inputCaret:  "#7c3aed",
  inputPlaceholder: "text-slate-400",
  inactiveSend:"rgba(0,0,0,0.06)",
  dotColor:    "#7c3aed",
  onlineColor: "#00a862",
  toggleBg:    "rgba(0,0,0,0.05)",
  toggleText:  "#64748b",
};

// ── Markdown renderer ─────────────────────────────────────────────────────────
function renderInline(text: string, boldColor: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} style={{ color: boldColor, fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

function renderMessage(content: string, t: typeof DARK): React.ReactNode {
  const lines = content.split("\n");
  const result: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listType: "ol" | "ul" | null = null;

  const flushList = (key: number) => {
    if (!listItems.length) return;
    const items = listItems.map((item, i) => (
      <li key={i} className="flex gap-2">
        <span style={{ color: t.listAccent, fontWeight: 600, minWidth: 18 }}>
          {listType === "ol" ? `${i + 1}.` : "•"}
        </span>
        <span>{renderInline(item, t.boldColor)}</span>
      </li>
    ));
    result.push(
      <ul key={`list-${key}`} className="list-none space-y-1 my-1.5">{items}</ul>
    );
    listItems = [];
    listType = null;
  };

  lines.forEach((line, i) => {
    const olMatch = line.match(/^(\d+)\.\s+(.+)/);
    const ulMatch = line.match(/^[-*]\s+(.+)/);
    if (olMatch) {
      if (listType === "ul") flushList(i);
      listType = "ol";
      listItems.push(olMatch[2]);
    } else if (ulMatch) {
      if (listType === "ol") flushList(i);
      listType = "ul";
      listItems.push(ulMatch[1]);
    } else {
      flushList(i);
      if (line.trim()) {
        result.push(<p key={i} className="my-0.5">{renderInline(line, t.boldColor)}</p>);
      } else if (result.length > 0) {
        result.push(<div key={i} className="h-1.5" />);
      }
    }
  });
  flushList(lines.length);

  return <div className="space-y-0.5">{result}</div>;
}

// ── Welcome message ───────────────────────────────────────────────────────────
const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi! I'm Venkatesh's AI assistant. Ask me anything about his experience, projects, skills, or how to hire him!",
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [isDark, setIsDark]       = useState(true);
  const [isOpen, setIsOpen]       = useState(false);
  const [messages, setMessages]   = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput]         = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  const t = isDark ? DARK : LIGHT;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const history = messages.slice(1); // skip welcome

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: history.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || data.error || "Something went wrong." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error. Please check your connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <>
      {/* ── Floating trigger button ── */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-20 z-50 flex items-center justify-center w-14 h-14 rounded-full focus:outline-none"
        style={{
          background: "linear-gradient(135deg, #7c3aed 0%, #00d97e 100%)",
          boxShadow: "0 0 24px rgba(124,58,237,0.5), 0 0 48px rgba(0,217,126,0.2)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} color="#fff" />
            </motion.span>
          ) : (
            <motion.span key="open"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} color="#fff" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-4 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: "min(400px, calc(100vw - 24px))",
              height: "min(520px, calc(100vh - 120px))",
              background: t.window,
              border: `1px solid ${t.windowBorder}`,
              boxShadow: t.windowShadow,
              backdropFilter: "blur(20px)",
              transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 flex-shrink-0"
              style={{
                background: t.header,
                borderBottom: `1px solid ${t.headerBorder}`,
                transition: "background 0.3s",
              }}
            >
              {/* Left: avatar + title */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed 0%, #00d97e 100%)" }}>
                  <Bot size={16} color="#fff" />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: t.titleText }}>
                    Ask Venkatesh&apos;s AI
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: t.onlineColor, boxShadow: `0 0 6px ${t.onlineColor}` }} />
                    <span className="text-xs" style={{ color: t.onlineColor }}>Online</span>
                  </div>
                </div>
              </div>

              {/* Right: theme toggle + reset + close */}
              <div className="flex items-center gap-1.5">
                <motion.button
                  onClick={() => setIsDark((v) => !v)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors"
                  style={{ background: t.toggleBg, color: t.toggleText }}
                  aria-label="Toggle theme"
                  title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isDark ? (
                      <motion.span key="sun"
                        initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Sun size={13} />
                      </motion.span>
                    ) : (
                      <motion.span key="moon"
                        initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                        <Moon size={13} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <button
                  onClick={() => setMessages([WELCOME_MESSAGE])}
                  className="text-xs px-2 py-1 rounded-md transition-colors"
                  style={{ color: t.resetText }}
                  title="Reset chat"
                >
                  Reset
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors hover:bg-black/10"
                  style={{ color: t.closeText }}
                  aria-label="Close chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
              style={{
                background: t.messages,
                scrollbarWidth: "thin",
                scrollbarColor: t.scrollbar,
                transition: "background 0.3s",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-0.5"
                      style={{ background: "linear-gradient(135deg,#7c3aed,#00d97e)", minWidth: 24 }}>
                      <Bot size={12} color="#fff" />
                    </div>
                  )}
                  <div
                    className="max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%)",
                            color: "#f1f5f9",
                            borderBottomRightRadius: "4px",
                          }
                        : {
                            background: t.aiBubbleBg,
                            border: `1px solid ${t.aiBubbleBdr}`,
                            color: t.aiBubbleTxt,
                            borderBottomLeftRadius: "4px",
                            transition: "background 0.3s, border-color 0.3s, color 0.3s",
                          }
                    }
                  >
                    {msg.role === "assistant" ? renderMessage(msg.content, t) : msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg,#7c3aed,#00d97e)" }}>
                    <Bot size={12} color="#fff" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                    style={{
                      background: t.aiBubbleBg,
                      border: `1px solid ${t.aiBubbleBdr}`,
                      borderBottomLeftRadius: "4px",
                    }}>
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full"
                        style={{ background: t.dotColor }}
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.16 }} />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div
              className="flex items-center gap-2 px-3 py-3 flex-shrink-0"
              style={{
                borderTop: `1px solid ${t.inputBorder}`,
                background: t.window,
                transition: "background 0.3s, border-color 0.3s",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Venkatesh..."
                disabled={isLoading}
                className={`flex-1 bg-transparent text-sm outline-none disabled:opacity-50 placeholder:${t.inputPlaceholder}`}
                style={{ color: t.inputText, caretColor: t.inputCaret }}
              />
              <motion.button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: input.trim() && !isLoading
                    ? "linear-gradient(135deg,#7c3aed 0%,#00d97e 100%)"
                    : t.inactiveSend,
                }}
                aria-label="Send message"
              >
                <Send size={15} color={input.trim() && !isLoading ? "#fff" : (isDark ? "#555" : "#aaa")} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
