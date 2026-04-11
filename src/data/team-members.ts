export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  languages?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Imran Latif",
    position: "Managing Director",
    image: "/images/team/imran-latif.jpg",
    languages: ["English", "Arabic", "Romanian"],
  },
  {
    id: 2,
    name: "Milana Dabueva",
    position: "Head of Primary Sales",
    image: "/images/team/milana-dabueva.jpg",
    languages: ["English", "Russian"],
  },
  {
    id: 3,
    name: "Kameta Shaipova",
    position: "Head of Secondary Sales",
    image: "/images/team/kameta-shaipova.jpg",
    languages: ["English", "Kazakh"],
  },
  {
    id: 4,
    name: "Tajamul Javed",
    position: "Senior Sales Manager",
    image: "/images/team/tajamul-javed.jpg",
    languages: ["English", "Urdu"],
  },
  {
    id: 5,
    name: "Avhilasha Rai",
    position: "Sales Officer",
    image: "/images/team/avhilasha-rai.jpg",
    languages: ["English", "Hindi"],
  },
  {
    id: 6,
    name: "Faryaz Ahmed Hakak",
    position: "Sales Officer",
    image: "/images/team/faryaz-ahmed-hakak.jpg",
    languages: ["English", "Pashto"],
  },
  {
    id: 7,
    name: "Faryaz Ahmed Hakak",
    position: "Sales Officer",
    image: "/images/team/faryaz-ahmed-hakak.jpg",
    languages: ["English", "Pashto"],
  },
  {
    id: 8,
    name: "Faryaz Ahmed Hakak",
    position: "Sales Officer",
    image: "/images/team/faryaz-ahmed-hakak.jpg",
    languages: ["English", "Pashto"],
  },
];