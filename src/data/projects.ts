export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  developerLogo: string;
  handover: string;
  starting_price: string;
  project_type: string;
  slug: string;
  mainImage: string;
  images: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Project 1",
    description: "Description 1",
    developerLogo: "/images/logo2-example.png",
    handover: "2025-01-01",
    starting_price: "100,000",
    project_type: "Apartment",
    slug: "project-1",
    mainImage: "/images/off-plan/example.jpg",
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description 2",
    developerLogo: "/images/logo2-example.png",
    handover: "2025-01-01",
    starting_price: "100,000",
    project_type: "Apartment",
    slug: "project-2",
    mainImage: "/images/off-plan/example.jpg",
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description 3",
    developerLogo: "/images/logo2-example.png",
    handover: "2025-01-01",
    starting_price: "100,000",
    project_type: "Apartment",
    slug: "project-3",
    mainImage: "/images/off-plan/example.jpg",
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
  },
  {
    id: 4,
    title: "Project 4",
    description: "Description 4",
    developerLogo: "/images/logo2-example.png",
    handover: "2025-01-01",
    starting_price: "100,000",
    project_type: "Apartment",
    slug: "project-4",
    mainImage: "/images/off-plan/example.jpg",
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
  },
  {
    id: 5,
    title: "Project 5",
    description: "Description 5",
    developerLogo: "/images/logo2-example.png",
    handover: "2025-01-01",
    starting_price: "100,000",
    project_type: "Apartment",
    slug: "project-5",
    mainImage: "/images/off-plan/example.jpg",
    images: ["https://via.placeholder.com/150", "https://via.placeholder.com/150"],
  },
];