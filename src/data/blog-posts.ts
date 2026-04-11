interface BlogPost {
  title: string;
  date: string;
  slug: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Buyer Representation",
    date: "20 August 2024",
    image: "/images/blogs/example.jpg",
    slug: "buyer-representation",
  },
  {
    title: "Rental and Leasing Services",
    date: "20 August 2024",
    image: "/images/blogs/example.jpg",
    slug: "rental-and-leasing-services",
  },
  {
    title: "Exploring the Wonders of Dubai: A Journey Through the City of Gold",
    date: "20 August 2024",
    image: "/images/blogs/example.jpg",
    slug: "exploring-the-wonders-of-dubai",
  },
];