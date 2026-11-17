"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

/*
 * ChatPanel — the M-WebCraft Assistant window.
 *
 * This component (and its dependencies) is code-split and only fetched
 * when the visitor shows intent: the launcher button is hovered/focused
 * or clicked (see chat-widget.tsx). It never ships in the initial page
 * bundle, so the chatbot cannot slow down the homepage.
 *
 * The open/close animation is a lightweight CSS transition (no
 * framer-motion here) and the panel stays mounted after the first open,
 * so the conversation persists while the user browses the page.
 */

interface ChatLink {
  label: string;
  href: string;
}

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[];
  /** true when the reply came from the prepared demo responses (AI offline). */
  demo?: boolean;
}

export interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  /** Question queued by an external "Learn more" trigger (mwebcraft:ask). */
  pendingAsk: { text: string; seq: number } | null;
  onAskHandled: () => void;
}

const WELCOME_MESSAGE =
  "Hello! Welcome to M-WebCraft Studio.\n\nI'm the M-WebCraft Assistant. I can help you learn about Muhammed's website design, AI chatbot and business automation services.\n\nWhat would you like to know?";

const QUICK_REPLIES = [
  "Website Design",
  "Website Redesign",
  "AI Chatbots",
  "Business Automation",
  "Website Hosting",
  "Contact Muhammed",
];

let nextId = 1;

export function ChatPanel({ open, onClose, pendingAsk, onAskHandled }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId++, role: "assistant", content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);
  const lastAskSeq = useRef(0);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, 800);
      if (!trimmed || sendingRef.current) return;
      sendingRef.current = true;

      const userMessage: ChatMessage = {
        id: nextId++,
        role: "user",
        content: trimmed,
      };

      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      setMessages((prev) => [...prev, userMessage]);
      setTyping(true);
      scrollToBottom();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });
        const data = await res.json();

        let links: ChatLink[] | undefined = data.links;
        if (!links && /contact|whatsapp|email|start|price|cost|hire|call|talk/i.test(data.reply ?? "")) {
          links = [
            { label: "Chat on WhatsApp", href: buildWhatsAppUrl() },
            { label: "Start a project", href: "#contact" },
          ];
        }

        setMessages((prev) => [
          ...prev,
          {
            id: nextId++,
            role: "assistant",
            content: data.reply ?? "Sorry, I couldn't process that. Please try again.",
            links,
            demo: data.mode === "demo",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nextId++,
            role: "assistant",
            content:
              "Sorry — I couldn't reach the server. Please try again, or reach Muhammed directly on WhatsApp.",
            links: [{ label: "Chat on WhatsApp", href: buildWhatsAppUrl() }],
            demo: true,
          },
        ]);
      } finally {
        setTyping(false);
        sendingRef.current = false;
        scrollToBottom();
      }
    },
    [messages, scrollToBottom],
  );

  // "Learn more" clicks from the service cards arrive as queued questions.
  // The timer is intentionally NOT cleared on dependency changes: clearing
  // onAskHandled()'s pendingAsk=null update would cancel the queued send.
  // send() guards itself against double-fires via sendingRef.
  useEffect(() => {
    if (!pendingAsk || pendingAsk.seq === lastAskSeq.current) return;
    lastAskSeq.current = pendingAsk.seq;
    const question = pendingAsk.text;
    onAskHandled();
    // Give the panel a moment to open before sending (as before).
    setTimeout(() => send(question), 350);
  }, [pendingAsk, onAskHandled, send]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [typing, messages, open, scrollToBottom]);

  return (
    <div
      role="dialog"
      aria-label="M-WebCraft Assistant"
      aria-hidden={!open}
      // inert keeps keyboard/screen-reader focus out while closed.
      inert={!open}
      className={cn(
        "fixed bottom-[5.5rem] right-4 z-50 flex h-[min(580px,72vh)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-3xl border border-border bg-ivory shadow-[0_30px_80px_-20px_rgba(7,59,43,0.45)]",
        "transition-[opacity,translate,scale] duration-200 ease-out",
        open
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-[0.98] opacity-0",
      )}
    >
      {/* header */}
      <div className="flex items-center gap-3 bg-forest px-4 py-4">
        <span className="flex size-10 items-center justify-center rounded-full bg-white p-1.5">
          <Image
            src="/m-webcraft-studio-logo.webp"
            alt=""
            aria-hidden="true"
            width={192}
            height={192}
            sizes="28px"
            className="size-full object-contain"
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ivory">
            M-WebCraft Assistant
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gold-light">
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            Online — replies instantly
          </p>
        </div>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Muhammed on WhatsApp instead"
          className="flex size-9 items-center justify-center rounded-full text-ivory/75 transition-colors hover:bg-white/10 hover:text-ivory"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
        </a>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="chat-scroll flex-1 space-y-3 overflow-y-auto bg-ivory px-4 py-4"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[86%] text-sm leading-relaxed",
              message.role === "user" ? "ml-auto" : "mr-auto",
            )}
          >
            <div
              className={cn(
                "whitespace-pre-line rounded-2xl px-4 py-3 shadow-sm",
                message.role === "user"
                  ? "rounded-br-md bg-forest text-ivory"
                  : "rounded-tl-md border border-border bg-white text-charcoal",
              )}
            >
              {message.content}
            </div>
            {message.links && message.links.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {message.links.map((link) =>
                  link.href.startsWith("#") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={onClose}
                      className="rounded-full border border-forest/30 bg-white px-3 py-1.5 text-xs font-bold text-forest transition-colors hover:bg-forest hover:text-ivory"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-espresso transition-colors hover:bg-gold-deep hover:text-white"
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ) : null}
            {message.demo ? (
              <p className="mt-1 text-[10px] italic text-charcoal/45">
                Prepared response — live AI is unavailable right now.
              </p>
            ) : null}
          </div>
        ))}

        {typing && (
          <div className="mr-auto flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border bg-white px-4 py-3 shadow-sm" aria-label="Assistant is typing">
            <span className="size-2 animate-bounce rounded-full bg-gold-deep/70 [animation-delay:0ms]" />
            <span className="size-2 animate-bounce rounded-full bg-gold-deep/70 [animation-delay:150ms]" />
            <span className="size-2 animate-bounce rounded-full bg-gold-deep/70 [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* quick replies */}
      {messages.length <= 1 && !typing && (
        <div className="flex flex-wrap gap-2 border-t border-border bg-white px-4 py-3">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => send(reply)}
              className="rounded-full border border-gold/45 bg-ivory px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          send(input);
          setInput("");
        }}
        className="flex items-center gap-2 border-t border-border bg-white p-3"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          aria-label="Type your question for the M-WebCraft Assistant"
          className="h-11 flex-1 rounded-full border-input bg-ivory px-4 focus-visible:ring-gold"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Send message"
          disabled={!input.trim() || typing}
          className="size-11 shrink-0 rounded-full bg-gold text-espresso hover:bg-forest hover:text-ivory"
        >
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}
