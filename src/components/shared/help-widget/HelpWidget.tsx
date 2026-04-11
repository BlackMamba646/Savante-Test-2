"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, Send, X, ChevronDown } from "lucide-react";
import { ContactModel } from "@/interfaces";
import { ChatPanel } from "../savante-gpt/ChatPanel";
import { LogoMobile } from "../icons/logo/logo-mobile";
import "./help-widget.css";

interface HelpWidgetProps {
  contactInfo?: ContactModel;
}

export const HelpWidget = ({ contactInfo }: HelpWidgetProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const togglePopup = useCallback(() => setIsPopupOpen(prev => !prev), []);
  const handleClosePopup = useCallback(() => setIsPopupOpen(false), []);

  const openChat = useCallback(() => {
    setIsPopupOpen(false);
    setIsChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <>
      <div className={`help-widget-trigger-wrapper ${isChatOpen ? "help-widget-trigger-wrapper--hidden" : ""}`}>
        <button
          className="help-widget-trigger"
          onClick={isPopupOpen ? handleClosePopup : togglePopup}
          aria-label="Open Help"
          type="button"
        >
          <div className="help-widget-trigger__icon">
            {isPopupOpen ? (
              <ChevronDown size={28} className="text-white" strokeWidth={2} />
            ) : (
              <MessageCircle size={28} className="text-white" strokeWidth={1.5} />
            )}
          </div>
        </button>
      </div>

      {isPopupOpen && (
        <div className="help-widget-popup">
          <div className="help-widget-header">
            <div className="help-widget-branding">
              <div className="help-widget-logo-container">
                <div style={{ transform: "scale(0.8)", transformOrigin: "left" }}>
                  <LogoMobile isDark={true} />
                </div>
              </div>
              <button className="help-widget-close" onClick={handleClosePopup} type="button">
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>
            
            <h2 className="help-widget-title">Hi there 👋</h2>
            <h3 className="help-widget-subtitle">How can we help?</h3>
          </div>

          <div className="help-widget-content">
            <button className="hw-action-button" onClick={openChat} type="button">
              <div className="hw-action-button-content">
                <div className="hw-action-icon-wrapper">
                  <MessageCircle size={20} strokeWidth={2} color="#111" />
                </div>
                <span>Live Chat</span>
              </div>
              <div className="hw-action-arrow">
                <Send size={18} strokeWidth={2} color="#111" />
              </div>
            </button>

            <Link
              href={contactInfo?.WhatsApp ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-action-button"
              onClick={handleClosePopup}
            >
              <div className="hw-action-button-content">
                <div className="hw-action-icon-wrapper">
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#25D366' className='w-5 h-5'>
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                  </svg>
                </div>
                <span>WhatsApp Us</span>
              </div>
              <div className="hw-action-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#111'}}>
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}

      {isChatOpen && <ChatPanel onClose={closeChat} />}
    </>
  );
};
