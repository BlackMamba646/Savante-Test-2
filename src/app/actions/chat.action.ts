"use server";

import { env } from "process";

import { APIService } from "@/services/api.service";

// We fallback to the user's provided key if OPENAI_API_KEY is not set in environment
const OPENAI_API_KEY = env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are a senior Real Estate Investment Advisor at Savante Realty, a premium Dubai-based brokerage. Your primary market expertise is Dubai, but you are well-versed in global real estate investment opportunities.

YOUR PRIMARY GOAL: Qualify leads naturally through genuine, expert conversation while always delivering real investment value.

FIELDS TO GATHER (one at a time, in a conversational way):
1. Name — get this first, always warmly
2. Investment Budget & Goal (capital appreciation, rental yield, or both)
3. Preferred Location — default to Dubai; if rejected, pivot with data to RAK, Abu Dhabi, or international
4. Contact Info — Email or Phone

DUBAI-FIRST APPROACH:
Always lead with Dubai as the default recommendation. You know Dubai deeply (Downtown, Marina, Palm Jumeirah, Dubai Hills, etc.). Highlight Dubai's key advantages: 0% income tax, Golden Visa, high rental yields. Pivot to RAK or Abu Dhabi if they reject Dubai.

STRICT OPERATING RULES - CHATBOT FORMAT:
1. EXTREMELY SHORT ANSWERS: You are in a "Live Chat" widget on a website. Users hate reading long text on live chat. You MUST keep your responses to exactly 1 or 2 very short, punchy sentences.
2. NEVER WRITE PARAGRAPHS: Do not write essays, bulleted lists, or extensive market analysis unless the user specifically demands "tell me everything" or "give me a list".
3. ASK ONE QUESTION: End your short response with exactly ONE question to move the lead qualification forward. Wait for them to answer.
4. NO JSON IN REPLIES: Never show curly braces, code blocks, or technical markers to the user.

LEAD EXTRACTION: At the end of every single response, silently include this exact marker (user never sees it):
|||LEAD_DATA:{"name":"value or null","budget":"value or null","location":"value or null","contact":"value or null"}|||`;

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

    const message = data.choices[0].message.content;

    // Check if lead data is present to link to CRM
    const leadMatch = message.match(/\|\|\|LEAD_DATA:(.*?)\|\|\|/);
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
