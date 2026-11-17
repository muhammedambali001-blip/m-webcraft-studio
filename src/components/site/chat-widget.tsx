"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Send, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/data/site";
import { cn } from "@/lib/utils";

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

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sendingRef = useRef(false);

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

  // First open → welcome message (exactly as scripted in the brief).
  const openChat = useCallback(() => {
    setOpen(true);
    setMessages((prev) => {
      if (prev.length === 0) {
        return [
          {
            id: nextId++,
            role: "assistant",
            content: WELCOME_MESSAGE,
          },
        ];
      }
      return prev;
    });
    scrollToBottom();
  }, [scrollToBottom]);

  // Listen for "Learn more" clicks from the service cards.
  useEffect(() => {
    const onAsk = (event: Event) => {
      const question = (event as CustomEvent<string>).detail;
      openChat();
      // Give the panel a moment to open before sending.
      setTimeout(() => send(question), 350);
    };
    window.addEventListener("mwebcraft:ask", onAsk);
    return () => window.removeEventListener("mwebcraft:ask", onAsk);
  }, []);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [typing, messages, open, scrollToBottom]);

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close M-WebCraft Assistant chat" : "Open M-WebCraft Assistant chat"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_14px_34px_-10px_rgba(7,59,43,0.55)] transition-all hover:scale-105 hover:bg-forest-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <>
            <MessageCircle className="size-6" aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-ivory bg-gold"
            />
          </>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="M-WebCraft Assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[5.5rem] right-4 z-50 flex h-[min(580px,72vh)] w-[min(92vw,384px)] flex-col overflow-hidden rounded-3xl border border-border bg-ivory shadow-[0_30px_80px_-20px_rgba(7,59,43,0.45)]"
          >
            {/* header */}
            <div className="flex items-center gap-3 bg-forest px-4 py-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-white p-1.5">
                <Image
                  src="/m-webcraft-studio-logo.png"
                  alt=""
                  aria-hidden="true"
                  width={1254}
                  height={1254}
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
                            onClick={() => setOpen(false)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
