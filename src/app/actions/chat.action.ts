"use server";

import { env } from "process";

import { APIService } from "@/services/api.service";

// We fallback to the user's provided key if OPENAI_API_KEY is not set in environment
const OPENAI_API_KEY = env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are the Savante AI Concierge, the official customer-support and lead-qualification assistant for Savante Realty.

YOUR GOAL:
Provide helpful, premium support to users by answering their questions about Savante Realty, our services, and our areas of operation. Naturally guide them to provide their contact details to book a consultation with our in-house experts.

TONE & STYLE:
- Premium, professional, supportive, and knowledgeable.
- Keep replies concise (2-3 short sentences max).
- Do not use markdown lists or long explanations. Keep it conversational.
- Do not output the JSON lead data block to the user.

COMPLIANCE RULES (NON-NEGOTIABLE):
1. Never provide financial predictions, guaranteed ROI/yields, legal/tax advice, or specific numerical market forecasts.
2. If asked for specific investment advice or predicted returns, politely decline by saying our in-house experts are best equipped to provide personalized financial guidance, and ask for their details to book a call.
3. You may share general starting prices of projects if mentioned in your knowledge base, but always emphasize that availability and prices vary.

SAVANTE REALTY KNOWLEDGE BASE:
- About Us: Savante Realty provides 360° end-to-end real estate support in Dubai and the UAE. We assist investors, relocators, and business owners from inquiry to post-handover.
- Leadership: Led by CEO Zayyan Amani. The team has over 20 years of combined experience and 100+ successful client placements.
- Core Values: Transparent, client-first approach with full support for visas, banking, and company formation.
- Services: 
  1. Expert Property Management
  2. After-Sales Services
  3. Real Estate Portfolio Management
  4. Mortgage & Financing Assistance
  5. Investment Advisory
- Key Areas: Dubai Hills Estate, Dubai Marina, Dubai Land Residence Complex, Maritime City, Business Bay, Palm Jumeirah.
- Notable Featured Projects: LOCI Residences in JVC, Azizi Venice 7, Solaya La Mer by Meraas, and Parkway by Prestige One.
- YouTube Insights: Our channel 'The Property Guy' covers topics like DIFC 2.0, high rental returns in JVC/Business Bay, and major developer launches.
- Contact: contact@savanterealty.com | Phone: +971 52 381 0148 or +971 55 422 7867.

CONVERSATION FLOW:
1. Greet the user or directly answer their question using the knowledge base.
2. If they haven't provided contact details, ask a polite follow-up question to gather: Name, Budget range, Preferred area, Contact info (email/phone), and Callback time. Gather these naturally.
3. If they share contact info, acknowledge it and continue assisting or finalize the booking.

LEAD EXTRACTION: At the end of every single response, silently include this exact marker at the very end of your message (the user never sees it):
|||LEAD_DATA:{"name":"value or null","budget":"value or null","location":"value or null","contact":"value or null"}|||`;

const LEAD_DATA_REGEX = /\|\|\|LEAD_DATA:(.*?)\|\|\|/;
const DEFAULT_LEAD_MARKER =
  '|||LEAD_DATA:{"name":"null","budget":"null","location":"null","contact":"null"}|||';

function getLeadMarker(message: string) {
  const leadMatch = message.match(LEAD_DATA_REGEX);
  return leadMatch ? `|||LEAD_DATA:${leadMatch[1]}|||` : DEFAULT_LEAD_MARKER;
}

export async function chatWithAI(history: { role: string; content: string }[]) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
        ],
      }),
    });

    const data = await response.json();

    if (data.error) throw new Error(data.error.message);

    let message = data.choices[0].message.content;

    // Optional: we trust the prompt's instructions instead of forcing strict regex overrides,
    // which allows the bot to naturally answer questions about the company.
    const leadMarker = getLeadMarker(message);
    if (!message.includes("|||LEAD_DATA:")) {
      message = `${message} ${leadMarker}`;
    }

    // Check if lead data is present to link to CRM
    const leadMatch = message.match(LEAD_DATA_REGEX);
    if (leadMatch) {
      try {
        const leadJson = JSON.parse(leadMatch[1]);

        // If the AI successfully captured the final contact info
        if (leadJson.name && leadJson.name !== "null" && leadJson.contact && leadJson.contact !== "null") {
          const contactStr = String(leadJson.contact).trim();
          const isEmail = contactStr.includes("@");

          await APIService.createLead({
            Name: leadJson.name,
            Email: isEmail ? contactStr : "",
            Phone_number: !isEmail ? contactStr.replace(/\D/g, "") : "",
            Message: `AI Captured Lead | Budget: ${leadJson.budget} | Location: ${leadJson.location}`
          });
          console.log("Savante GPT Lead successfully pushed to CRM via APIService.");
        }
      } catch (e) {
        console.error("Failed to parse or submit Lead Data from AI", e);
      }
    }

    return { success: true, reply: message };
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return { success: false, error: error.message || "Failed to connect to AI" };
  }
}
