export interface Podcast {
  id: number;
  title: string;
  bannerImage: string;
  url: string;
  date: string;
  category: string;
}

export const podcastsData: Podcast[] = [
  {
    id: 1,
    title: "DO NOT BUY A PROPERTY IN DUBAI WITHOUT WATCHING THIS...",
    bannerImage: "/images/social/youtube/thumbnail-example.jpg",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "19 Dic 2025",
    category: "Podcast - 19 Dic 2025",
  },
  {
    id: 2,
    title: "Investing in Dubai Real Estate: Pros & Cons",
    bannerImage: "/images/social/youtube/thumbnail-example.jpg",
    url: "https://open.spotify.com/episode/2KJH4N8ABpYdSk13KQotys",
    date: "02 Jan 2024",
    category: "Podcast",
  },
  {
    id: 3,
    title: "Top 5 Mistakes Foreign Buyers Make",
    bannerImage: "/images/social/youtube/thumbnail-example.jpg",
    url: "https://www.youtube.com/watch?v=5Tq-Vo5c34M",
    date: "23 Feb 2024",
    category: "Podcast",
  },
  {
    id: 4,
    title: "2024 Real Estate Forecast for Dubai",
    bannerImage: "/images/social/youtube/thumbnail-example.jpg",
    url: "https://open.spotify.com/episode/1Cf0RINFt1FCRo6qhvQngl",
    date: "11 Mar 2024",
    category: "Podcast",
  },
  {
    id: 5,
    title: "Everything You Need to Know About Off-Plan Properties",
    bannerImage: "/images/social/youtube/thumbnail-example.jpg",
    url: "https://www.youtube.com/watch?v=AYs0qz7P4oU",
    date: "27 Mar 2024",
    category: "Podcast",
  },
];