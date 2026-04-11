export interface Area {
  id: number;
  name: string;
  image: string;
  link: string;
}

export const areasData: Area[] = [
  {
    id: 1,
    name: "Downtown Dubai",
    image: "/images/areas/example.jpg",
    link: "/areas/downtown-dubai",
  },
  {
    id: 2,
    name: "Dubai Creek Harbour",
    image: "/images/areas/example.jpg",
    link: "/areas/dubai-creek-harbour",
  },
  {
    id: 3,
    name: "Damac Logoons",
    image: "/images/areas/example.jpg",
    link: "/areas/santorini-damac-lagoons",
  },
  {
    id: 4,
    name: "The Valley",
    image: "/images/areas/example.jpg",
    link: "/areas/the-valley",
  },
];
