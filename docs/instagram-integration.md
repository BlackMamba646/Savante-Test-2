# Instagram Integration with Apify

This document explains how to use the Instagram scraper integration in the Savante Realty project.

## Overview

The Instagram integration uses Apify's Instagram Scraper actor to fetch profile information and recent reels/posts from Instagram accounts.

## Setup

### 1. Environment Variables

Add the following variables to your `.env.local` file:

```env
# Instagram Configuration
NEXT_PUBLIC_INSTAGRAM_USERNAME="theproperteaguy"

# Apify Configuration
APIFY_TOKEN="your-apify-api-token"
APIFY_INSTAGRAM_ACTOR_ID="shu8hvrXbJbY3Eb9W"
```

### 2. Get Apify API Token

1. Create an account at [Apify](https://apify.com)
2. Go to Settings → Integrations → API tokens
3. Create a new API token
4. Copy the token to your `.env.local` file

## Usage

### Server Component (Recommended)

Use the server component for better performance and SEO:

```tsx
import { InstagramReelsServer } from "@/components/home/sections/InstagramReelsServer";

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <InstagramReelsServer />
    </main>
  );
}
```

### Client Component with Hook

If you need client-side interactivity:

```tsx
"use client";
import { useInstagramData } from "@/hooks/use-instagram-data";

export function MyComponent() {
  const { data, error, loading, refetch } = useInstagramData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>@{data.profile.username}</h2>
      <p>{data.profile.followersCount} followers</p>
      {/* Display reels */}
    </div>
  );
}
```

### Direct Server Action

For custom implementations:

```tsx
import { fetchInstagramData } from "@/app/actions/instagram.action";

export async function CustomInstagramSection() {
  const result = await fetchInstagramData("username", {
    reelsLimit: 10,
    cacheTime: 7200, // 2 hours
  });

  if ("error" in result) {
    return <div>Error loading Instagram data</div>;
  }

  return <div>{/* Custom display logic */}</div>;
}
```

## Service Architecture

### Files Structure

```
src/
├── interfaces/
│   └── instagram-response.interface.ts  # TypeScript interfaces
├── services/
│   └── instagram.service.ts            # Core service logic
├── app/actions/
│   └── instagram.action.ts             # Server actions
├── hooks/
│   └── use-instagram-data.ts           # React hook
└── components/home/sections/
    ├── InstagramReels.tsx              # Client component
    └── InstagramReelsServer.tsx        # Server component
```

### Data Flow

1. **Server Action** (`instagram.action.ts`)
   - Validates input
   - Checks cache (if implemented)
   - Calls service

2. **Service** (`instagram.service.ts`)
   - Initializes Apify client
   - Runs Instagram scraper actor
   - Processes and maps data
   - Returns formatted response

3. **Components**
   - Server component fetches data directly
   - Client component uses hook for reactivity
   - Both handle loading and error states

## Data Types

### InstagramProfile

```typescript
interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  externalUrl?: string;
  businessCategoryName?: string;
}
```

### InstagramReel

```typescript
interface InstagramReel {
  id: string;
  url: string;
  type: "video" | "image";
  caption?: string;
  displayUrl: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  viewCount?: number;
  likeCount: number;
  commentCount: number;
  timestamp: string;
  isVideo: boolean;
  dimensions: {
    width: number;
    height: number;
  };
}
```

## Caching Strategy

Currently, the service includes placeholder methods for caching:

```typescript
// In instagram.service.ts
getCachedData: async function (username: string) {
  // TODO: Implement Redis or similar caching
  return null;
}
```

For production, consider implementing:
- Redis for distributed caching
- Next.js unstable_cache for edge caching
- Local memory cache for development

## Error Handling

The service handles various error scenarios:

- Invalid username format
- API failures
- No data found
- Rate limiting

All errors return a standardized error response:

```typescript
interface InstagramErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
```

## Rate Limits

Apify has usage limits based on your plan:
- Free tier: Limited compute units
- Paid plans: Higher limits

Monitor your usage in the Apify dashboard.

## Best Practices

1. **Cache Data**: Instagram data doesn't change frequently, cache for at least 1 hour
2. **Error Boundaries**: Always handle errors gracefully with fallback content
3. **Loading States**: Show skeletons or placeholders while loading
4. **Respect Rate Limits**: Don't fetch too frequently
5. **Static Fallback**: Always have static content as fallback

## Troubleshooting

### Common Issues

1. **"No data found"**
   - Check if the Instagram account exists
   - Verify it's not private
   - Check Apify actor is running

2. **"Invalid username"**
   - Instagram usernames: 1-30 chars, letters/numbers/periods/underscores only

3. **API Token Issues**
   - Verify token is correct in `.env.local`
   - Check token permissions in Apify dashboard

4. **Rate Limiting**
   - Implement caching
   - Reduce fetch frequency
   - Upgrade Apify plan if needed