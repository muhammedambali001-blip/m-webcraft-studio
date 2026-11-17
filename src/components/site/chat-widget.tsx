"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";

/*
 * ChatWidget — always-visible launcher + on-demand chat window.
 *
 * The heavy chat UI (ChatPanel) is code-split: its JavaScript is fetched
 * only when the visitor shows intent — pointer moves over the launcher,
 * the launcher is focused, or the launcher is clicked. The button itself
 * is server-rendered and interactive immediately, so the chatbot adds
 * (almost) zero cost to the initial page load.
 */

/* Loading: nothing — the panel transitions in via its own CSS classes. */
const ChatPanel = dynamic(
  () => import("./chat-panel").then((m) => m.ChatPanel),
  { ssr: false, loading: () => null },
);

let panelPreloaded = false;
function preloadPanel() {
  if (panelPreloaded) return;
  panelPreloaded = true;
  void import("./chat-panel");
}

let askSeq = 1;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pendingAsk, setPendingAsk] = useState<{
    text: string;
    seq: number;
  } | null>(null);

  const openChat = useCallback(() => {
    setMounted(true);
    setOpen(true);
  }, []);

  // Listen for "Learn more" clicks from the service cards.
  useEffect(() => {
    const onAsk = (event: Event) => {
      const question = (event as CustomEvent<string>).detail;
      openChat();
      setPendingAsk({ text: question, seq: askSeq++ });
    };
    window.addEventListener("mwebcraft:ask", onAsk);
    return () => window.removeEventListener("mwebcraft:ask", onAsk);
  }, [openChat]);

  const handleAskHandled = useCallback(() => setPendingAsk(null), []);

  return (
    <>
      {/* Launcher — visible immediately, zero lazy-loading */}
      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            preloadPanel();
            openChat();
          }
        }}
        onPointerEnter={preloadPanel}
        onFocus={preloadPanel}
        aria-label={
          open
            ? "Close M-WebCraft Assistant chat"
            : "Open M-WebCraft Assistant chat"
        }
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

      {/* Chat window — fetched on first intent, kept mounted afterwards */}
      {mounted && (
        <ChatPanel
          open={open}
          onClose={() => setOpen(false)}
          pendingAsk={pendingAsk}
          onAskHandled={handleAskHandled}
        />
      )}
    </>
  );
}
