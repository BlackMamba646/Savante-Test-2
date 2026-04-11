import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `You are **Savante GPT**, the AI-powered real estate advisor for **Savante Realty**, a premier real estate agency based in Dubai, UAE.

## About Savante Realty
- **Office**: G03 - Emaar Square Building 3 - Downtown Dubai, Dubai
- **Phone**: +971 52 381 0148
- **Email**: info@savantrealty.com
- **Website**: https://savanterealty.com
- **WhatsApp**: https://api.whatsapp.com/send?phone=971523810148

## Services
- Investment Advisory
- Mortgage & Financing Assistance
- Real Estate Portfolio Management
- Real Estate Marketing Solutions
- After-Sales Services
- Expert Property Management in Dubai

## Areas of Expertise
- Palm Jebel Ali, Dubai Marina, Downtown Dubai, Palm Jumeirah, Business Bay, Dubai Hills Estate
- Off-plan projects, ready properties, villas, apartments, penthouses, townhouses

## Property Types
Apartments, Villas, Townhouses, Penthouses, Studios, Flats, Offices, Duplexes, Full Floors, Warehouses, Land, and more.

## Behavioral Guidelines
1. Be friendly, professional, and knowledgeable about Dubai real estate.
2. When discussing properties, mention relevant areas and property types.
3. For specific inquiries (pricing, availability, bookings), encourage the user to contact an agent via WhatsApp (+971 52 381 0148) or email (info@savantrealty.com).
4. Direct users to the website (savanterealty.com) for browsing properties, off-plan projects, and developer listings.
5. Provide market insights, ROI guidance, and investment tips when asked.
6. Always mention that Savante Realty offers free consultations.
7. Keep responses concise but informative. Use markdown formatting for clarity.
8. If asked about topics outside real estate, politely redirect to how Savante Realty can help with their property needs.
9. Respond in the same language as the user's message when possible.`;

// Demo responses when no API key is configured
const DEMO_RESPONSES: Record<string, string> = {
  default: `Welcome to **Savante Realty**! 🏗️

I'm your personal real estate advisor for Dubai's premium property market. Here's how I can help:

- 🏠 **Property Search** — Find apartments, villas, penthouses & more
- 📊 **Market Insights** — Latest trends & ROI analysis
- 🏗️ **Off-Plan Projects** — New developments from top developers
- 💰 **Investment Advisory** — Maximize your returns

Feel free to ask anything about Dubai real estate, or contact our team directly:
- 📱 **WhatsApp**: [+971 52 381 0148](https://api.whatsapp.com/send?phone=971523810148)
- 📧 **Email**: info@savantrealty.com

What would you like to know?`,

  investment: `## Investment Opportunities in Dubai 📊

Dubai's real estate market continues to offer strong returns:

- **Average ROI**: 6-10% annually for rental properties
- **Capital Appreciation**: 15-25% in premium areas since 2023
- **Top Areas for Investment**:
  - 🌴 Palm Jumeirah — Luxury waterfront living
  - 🏙️ Downtown Dubai — Premium urban lifestyle
  - 🌊 Dubai Marina — High rental demand
  - 🏗️ Palm Jebel Ali — Emerging opportunity

> 💡 **Free Consultation**: Our investment advisors can create a personalized portfolio strategy for you.

📱 Contact us on [WhatsApp](https://api.whatsapp.com/send?phone=971523810148) to schedule a free consultation!`,

  offplan: `## Off-Plan Projects 🏗️

Investing in off-plan properties offers several advantages:

- ✅ **Lower entry prices** compared to ready properties
- ✅ **Flexible payment plans** (often 60/40 or 70/30)
- ✅ **Capital appreciation** before handover
- ✅ **Brand new** with modern amenities

### Top Developers We Work With
Emaar, DAMAC, Nakheel, Sobha Realty, Meraas, Binghatti, Ellington, Omniyat & more.

Browse all off-plan projects on our website: [savanterealty.com/off-plan](https://savanterealty.com/off-plan)

Would you like details on a specific project or area?`,

  areas: `## Popular Areas in Dubai 🗺️

### Premium Locations
| Area | Best For | Starting Price |
|------|----------|----------------|
| 🌴 Palm Jumeirah | Waterfront luxury | AED 2M+ |
| 🏙️ Downtown Dubai | Urban lifestyle | AED 1.5M+ |
| 🌊 Dubai Marina | High rental yield | AED 800K+ |
| 🏢 Business Bay | Investment | AED 700K+ |
| 🌿 Dubai Hills | Family living | AED 1M+ |
| 🏖️ Palm Jebel Ali | New opportunity | AED 1.5M+ |

Each area offers unique advantages. Would you like details about a specific area?

🔍 Explore all areas: [savanterealty.com/properties-by-areas](https://savanterealty.com/properties-by-areas)`,

  market: `## Dubai Real Estate Market Trends 📈

### Current Market Highlights
- 🔥 **Strong demand** across all segments
- 📈 **Property values** continuing upward trajectory
- 🏗️ **Record new launches** from top developers
- 🌍 **International buyers** driving premium segment

### Key Insights
1. **Rental market** remains robust with high occupancy rates
2. **Off-plan sales** at all-time highs
3. **Golden Visa** program boosting investor confidence
4. **Infrastructure development** (metro expansion, new attractions)

> 💡 Our team provides detailed market reports and personalized analysis.

Want a specific area or property type analysis? Contact us for a free consultation!`,

  roi: `## ROI Analysis — Dubai Real Estate 💰

### Average Rental Yields by Area
| Area | Yield | Risk Level |
|------|-------|------------|
| Dubai Marina | 7-8% | Low |
| Business Bay | 7-9% | Low |
| JVC | 8-10% | Medium |
| Downtown Dubai | 5-7% | Low |
| Palm Jumeirah | 5-6% | Low |

### Factors Affecting ROI
- 📍 Location & accessibility
- 🏗️ Property age & condition
- 📑 Service charges
- 📊 Market supply & demand
- 🎯 Target tenant demographic

> Our investment advisors can help you calculate projected returns for specific properties.

📱 [Get a free ROI analysis](https://api.whatsapp.com/send?phone=971523810148)`,
};

function getDemoResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("invest") || msg.includes("buy") || msg.includes("purchase")) {
    return DEMO_RESPONSES.investment;
  }
  if (msg.includes("off-plan") || msg.includes("off plan") || msg.includes("new project") || msg.includes("developer")) {
    return DEMO_RESPONSES.offplan;
  }
  if (msg.includes("area") || msg.includes("location") || msg.includes("where") || msg.includes("palm") || msg.includes("marina") || msg.includes("downtown")) {
    return DEMO_RESPONSES.areas;
  }
  if (msg.includes("market") || msg.includes("trend") || msg.includes("price")) {
    return DEMO_RESPONSES.market;
  }
  if (msg.includes("roi") || msg.includes("return") || msg.includes("yield") || msg.includes("rental")) {
    return DEMO_RESPONSES.roi;
  }
  return DEMO_RESPONSES.default;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // If no API key, use demo mode
    if (!OPENAI_API_KEY) {
      const lastUserMessage = messages.filter((m: { role: string }) => m.role === "user").pop();
      const demoContent = getDemoResponse(lastUserMessage?.content || "");

      // Simulate streaming with a delay
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        async start(controller) {
          const words = demoContent.split(" ");
          for (let i = 0; i < words.length; i++) {
            const chunk = (i === 0 ? "" : " ") + words[i];
            controller.enqueue(encoder.encode(chunk));
            await new Promise((resolve) => setTimeout(resolve, 20));
          }
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    // OpenAI streaming mode
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI error:", err);
      return NextResponse.json(
        { error: "Failed to get AI response" },
        { status: 500 }
      );
    }

    // Forward the stream
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((line) => line.trim() !== "");

            for (const line of lines) {
              if (line === "data: [DONE]") continue;
              if (!line.startsWith("data: ")) continue;

              try {
                const json = JSON.parse(line.slice(6));
                const content = json.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
