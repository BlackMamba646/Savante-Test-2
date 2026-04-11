export interface Service {
  id: number;
  title: string;
  image: string;
  link: string;
}

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Buyer Representation",
    image: "/images/services/buyer-representation.jpg",
    link: "/services/buyer-representation"
  },
  {
    id: 2,
    title: "Seller Representation",
    image: "/images/services/seller-representation.jpg", 
    link: "/services/seller-representation"
  },
  {
    id: 3,
    title: "Rental and Leasing Services",
    image: "/images/services/rental-and-leasing-services.jpg",
    link: "/services/rental-leasing"
  },
  {
    id: 4,
    title: "Negotiation and Transaction Management",
    image: "/images/services/negotiation-and-transaction-management.jpg",
    link: "/services/negotiation-transaction-management"
  },
  {
    id: 5,
    title: "Property Investment Advisory",
    image: "/images/services/rental-and-leasing-services.jpg",
    link: "/services/investment-advisory"
  },
  {
    id: 6,
    title: "Market Analysis & Consultation",
    image: "/images/services/buyer-representation.jpg",
    link: "/services/market-analysis"
  },
  {
    id: 7,
    title: "Market Analysis & Consultation",
    image: "/images/services/buyer-representation.jpg",
    link: "/services/market-analysis"
  },
  {
    id: 8,
    title: "Market Analysis & Consultation",
    image: "/images/services/buyer-representation.jpg",
    link: "/services/market-analysis"
  }
];