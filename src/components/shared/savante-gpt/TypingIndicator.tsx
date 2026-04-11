"use client";

import React from "react";

export const TypingIndicator = () => {
  return (
    <div className="savante-gpt-message savante-gpt-message--assistant">
      <div className="savante-gpt-message__avatar">
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="savante-gpt-typing">
        <span className="savante-gpt-typing__dot" />
        <span className="savante-gpt-typing__dot" />
        <span className="savante-gpt-typing__dot" />
      </div>
    </div>
  );
};
