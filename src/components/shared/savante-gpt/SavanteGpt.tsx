"use client";

import React, { useState, useCallback } from "react";
import { ChatPanel } from "./ChatPanel";
import { MessageCircle } from "lucide-react";
import "./savante-gpt.css";

export const SavanteGpt = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {/* Floating Trigger Button & Tooltip Wrapper */}
      <div className={`savante-gpt-trigger-wrapper ${isOpen ? "savante-gpt-trigger-wrapper--hidden" : ""}`}>
        <div className="savante-gpt-tooltip">
          <span>Live chat</span>
        </div>
        <button
          id="savante-gpt-trigger"
          className="savante-gpt-trigger"
          onClick={handleOpen}
          aria-label="Open Savante AI Concierge"
          type="button"
        >
          <div className="savante-gpt-trigger__icon">
            <MessageCircle size={28} className="text-white" strokeWidth={1.5} />
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && <ChatPanel onClose={handleClose} />}
    </>
  );
};
