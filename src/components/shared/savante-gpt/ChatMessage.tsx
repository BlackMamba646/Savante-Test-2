"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LogoMobile } from "../icons/logo/logo-mobile";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`savante-gpt-message ${
        isUser ? "savante-gpt-message--user" : "savante-gpt-message--assistant"
      }`}
    >
      {!isUser && (
        <div className="savante-gpt-message__avatar overflow-hidden">
          <div style={{ transform: "scale(0.55)", transformOrigin: "center" }}>
            <LogoMobile isDark={true} />
          </div>
        </div>
      )}
      <div className="savante-gpt-message__bubble">
        {isUser ? (
          <p className="savante-gpt-message__text">{message.content}</p>
        ) : (
          <div className="savante-gpt-message__markdown">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};
