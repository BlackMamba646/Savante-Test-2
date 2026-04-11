import { ROUTING } from "@/config/constant.config";

export interface ClusterCard {
  id: number;
  title: string;
  bannerImage: string;
  buttonText: string;
  link: string;
}

export const clusterCards: ClusterCard[] = [
  {
    id: 1,
    title: "Discover our projects",
    bannerImage: "/images/home/cluster/image-one.webp",
    buttonText: "Explore",
    link: ROUTING.OFF_PLAN,
  },
  {
    id: 2,
    title: "Best areas to invest",
    bannerImage: "/images/home/cluster/image-two.webp",
    buttonText: "Learn More",
    link: ROUTING.PROPERTIES_BY_AREAS,
  },
  {
    id: 3,
    title: "Explore our guides",
    bannerImage: "/images/home/cluster/image-three.webp",
    buttonText: "Read Guides",
    link: ROUTING.BLOGS,
  },
];