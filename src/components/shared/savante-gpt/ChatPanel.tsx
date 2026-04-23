"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage, type Message } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { chatWithAI } from "@/app/actions/chat.action";
import { LogoMobile } from "../icons/logo/logo-mobile";
import "./savante-gpt.css";

interface ChatPanelProps {
  onClose: () => void;
}

const SUGGESTION_CHIPS = [
  { label: "🏗️ Off-Plan Projects", message: "Tell me about the latest off-plan projects in Dubai" },
  { label: "📊 Market Trends", message: "What are the current Dubai real estate market trends?" },
  { label: "💰 Investment Opportunities", message: "What are the best investment opportunities in Dubai real estate?" },
  { label: "🗺️ Areas in Dubai", message: "Which are the best areas to live in Dubai?" },
  { label: "📈 ROI Analysis", message: "What kind of ROI can I expect from Dubai properties?" },
];

export const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Focus textarea on mount
  useEffect(() => {
    setTimeout(() => textareaRef.current?.focus(), 300);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const history = updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await chatWithAI(history);

        if (!res.success || !res.reply) {
          throw new Error(res.error || "Failed to get response form AI");
        }

        let reply = res.reply;
        
        // Remove the hidden LEAD_DATA chunk if it exists before showing logic
        const leadMatch = reply.match(/\|\|\|LEAD_DATA:(.*?)\|\|\|/);
        if (leadMatch) {
          console.log("Lead captured:", leadMatch[1]);
          reply = reply.replace(/\|\|\|LEAD_DATA:.*?\|\|\|/, "").trim();
        }

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);

      } catch (error) {
        console.error("Chat error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at **+971 52 381 0148**.",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleChipClick = (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="savante-gpt-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        className="savante-gpt-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="savante-gpt-header">
          <div className="savante-gpt-header__info">
            <div className="savante-gpt-header__avatar overflow-hidden">
              <div style={{ transform: "scale(0.65)", transformOrigin: "center" }}>
                <LogoMobile isDark={true} />
              </div>
            </div>
            <div>
              <h2 className="savante-gpt-header__title">Savante AI Concierge</h2>
              <p className="savante-gpt-header__subtitle">Premium Intelligence</p>
            </div>
          </div>
          <button
            className="savante-gpt-header__close"
            onClick={onClose}
            aria-label="Close chat"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="savante-gpt-messages">
          {messages.length === 0 ? (
            <div className="savante-gpt-welcome">
              <div className="savante-gpt-welcome__icon overflow-hidden">
                <div style={{ transform: "scale(1)", transformOrigin: "center" }}>
                  <LogoMobile isDark={true} />
                </div>
              </div>
              <h3 className="savante-gpt-welcome__title">
                Welcome to Savante AI Concierge
              </h3>
              <p className="savante-gpt-welcome__text">
                I can help collect your requirements and connect you with our in-house expert.
                Start by sharing your details or choosing an option below.
              </p>
              <div className="savante-gpt-chips">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip.label}
                    className="savante-gpt-chip"
                    onClick={() => handleChipClick(chip.message)}
                    type="button"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="savante-gpt-input-area">
          <div className="savante-gpt-input-wrapper">
            <textarea
              ref={textareaRef}
              id="savante-gpt-input"
              className="savante-gpt-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share your details to book a call..."
              rows={1}
              disabled={isLoading}
            />
            <button
              className={`savante-gpt-send ${input.trim() ? "savante-gpt-send--active" : ""}`}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              type="button"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
          <p className="savante-gpt-input-hint">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};
