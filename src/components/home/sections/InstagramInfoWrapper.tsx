import { Suspense } from "react";
import { InstagramInfo } from "./InstagramInfo";
import { InstagramInfoSkeleton } from "./InstagramInfoSkeleton";
import { instagramService } from "@/services/instagram.service";

async function InstagramInfoAsync() {
  try {
    const instagramData = await instagramService.getProfileWithReels(
      process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || "zayyanamani",
      8
    );
    
    return <InstagramInfo data={instagramData} />;
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return <InstagramInfo data={null} />;
  }
}

export function InstagramInfoWrapper() {
  return (
    <Suspense fallback={<InstagramInfoSkeleton />}>
      <InstagramInfoAsync />
    </Suspense>
  );
}