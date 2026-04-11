import { cleanPhoneNumber } from "@/utils/phone-format";

export enum ROUTING {
  HOME = "/",
  ABOUT_US = "/about-us",
  ABOUT_ZAYYAN_AMANI = "/about-zayyan-amani",
  BLOGS = "/blogs",
  DEVELOPERS = "/developers",
  FOR_RENT = "/for-rent",
  FOR_SALE = "/for-sale",
  LIST_YOUR_PROPERTY = "/list-your-property",
  OFF_PLAN = "/off-plan",
  OUR_BLOG = "/our-blog",
  OUR_TEAM = "/our-team",
  PROPERTIES_BY_AREAS = "/properties-by-areas",
  SEO_PROPERTY_LISTING = "/search",
  SERVICES = "/services",
  PRIVACY_POLICY = "/privacy-policy",
  TERMS_AND_CONDITIONS = "/terms-and-conditions",
  COOKIE_POLICY = "/cookie-policy",
  CONTACT_US = "/contact-us",
  SUCCESS = "/thank-you",
  NOT_FOUND = "/not-found",
}

export enum ENDPOINT_SERVER {
  HOME_CONTENT = "/home-content",
  ABOUT_US_CONTENT = "/about-us-content",
  BLOG_PAGE = "/blog-page",
  LIST_PROPERTY_CONTENT = "/list-your-property-content",
  PROPERTY_PAGE_CONTENT = "/property-page-content",
  OFF_PLAN_PAGE_CONTENT = "/off-plan-page-content",
  SERVICE_PAGE_CONTENT = "/service-page-content",
  OFF_PLAN_LISTING = "/off-plan-listing",
  PROPERTY_LISTING = "/property-listing-content",
  LIST_PROPERTY = "/list-your-property",
  AGENTS = "/agents",
  PROPERTIES = "/properties",
  PROJECTS = "/projects",
  DEVELOPERS = "/developers",
  LANDING_PAGES = "/landing-pages",
  SERVICES = "/services",
  BLOGS = "/blogs",
  AREAS = "/areas",
  CONTACT_INFO = "/contact-info",
  REVIEWS = "/reviews",
  TESTIMONIES = "/testimonies",
  PROPERTY_SEO = "/property-seos",
  NEWSLETTER = "/newsletter-subscriptions",
  CLUSTER = "/cluster",
  LEADS = "/leads",
  CP = "/cookie-policy",
  PP = "/privacy-policy",
  TC = "/terms-and-condition",
}

export enum BREAKPOINTS {
  MOBILE = 475,
  TABLET = 744,
  LAPTOP = 1232,
  DESKTOP = 1440,
}

export const CONTACT_INFO = {
  businessTitle: "Savante Realty",
  phone: "+971 52 381 0148",
  plainPhone: "+971523810148",
  address: "G03 - Emaar Square Building 3 - Downtown Dubai, Dubai",
  email: "info@savantrealty.com",
  builderProvider: "Propphy",
  builderLink: "https://www.propphy.com/",
  instagramLink: "https://www.instagram.com/savantrealty/",
  facebookLink: "",
  snapchatLink: "",
  tikTokLink: "",
  twitterLink: "",
  youtubeLink: "https://www.youtube.com/@theproperteaguy",
  linkedinLink: "https://www.linkedin.com/company/savant-realty",
  whatsAppLink: `https://api.whatsapp.com/send?phone=971523810148&text=${encodeURIComponent(
    "Hi! I have a quick consultation about Dubai Real Estate."
  )}`,
  whatsAppMessage: function (phone: string) {
    return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(
      "Hi! I have a quick consultation about Dubai Real Estate."
    )}`;
  },
  whatsappPropertyMessage: function (phone: string, url: string) {
    const message = `Hi! I am interested in the property: ${url}. I would like to know more details about this property.`;
    return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(
      message
    )}`;
  },
  whatsappPropertyProjectMessage: function (phone: string, url: string) {
    const message = `Hi! I am interested in the project: ${url}. I would like to know more details about this project.`;
    return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(
      message
    )}`;
  },
  welcomeWhatsAppMessage: function (name: string) {
    return `https://wa.me/${this.plainPhone}?text=${encodeURIComponent(
      `Hi ${name}, I would like to know more about your services.`
    )}`;
  },
  agentWhatsAppMessage: function (phone: string, name: string) {
    return `https://wa.me/${cleanPhoneNumber(phone)}?text=${encodeURIComponent(
      `Hi ${name}, I would like to know more about your services.`
    )}`;
  },
};

export enum ENDPOINTS {
  HOMEPAGE = "/homepage",
}

export enum FormNames {
  CONTACT = "contact",
  NEWSLETTER = "newsletter",
  PROPERTY = "property",
  BROCHURE = "brochure",
}

export enum INPUT_REASON {
  Buy = "Buyer",
  Sell = "Seller",
  Rent = "Tenant",
  RentProperty = "Landlord",
}

export const FORM_BASE_FIELDS = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
};

export const FORM_LIST_YOUR_PROPERTY = {
  ...FORM_BASE_FIELDS,
  type: "", // reason
  note: "", // message
};

export enum AREA_TYPES {
  PALM_JEBEL_ALI = "Palm Jebel Ali",
  DUBAI_MARINA = "Dubai Marina",
  DOWNTOWN_DUBAI = "Downtown Dubai",
  PALM_JUMEIRAH = "Palm Jumeirah",
  BUSINESS_BAY = "Business Bay",
  DUBAI_HILLS_ESTATE = "Dubai Hills Estate",
}

export enum ROUTING_SERVICES {
  INVESTMENT_ADVISORY = "/investment-advisory",
  MORTGAGE_FINANCING_ASSISTANCE = "/mortgage-and-financing-assistance",
  REAL_ESTATE_PORTFOLIO_MANAGEMENT = "/real-estate-portfolio-management",
  REAL_ESTATE_MARKETING_SOLUTIONS = "/real-estate-marketing-solutions",
  AFTER_SALES_SERVICES = "/after-sales-services",
  EXPERT_PROPERTY_MANAGEMENT_IN_DUBAI = "/expert-property-management-in-dubai",
}

export const SORT_OPTIONS = [
  {
    text: "Newest",
    value: "newest",
  },
  {
    text: "Oldest",
    value: "oldest",
  },
  {
    text: "Price (Low to High)",
    value: "price-asc",
  },
  {
    text: "Price (High to Low)",
    value: "price-desc",
  },
];

export const SORT_PROJECT_OPTIONS = [
  {
    text: "Newest",
    value: "newest",
  },
  {
    text: "Oldest",
    value: "oldest",
  },
];

export const LANGUAGE_AGENT_OPTIONS = [
  {
    text: "English",
    value: "english",
  },
  {
    text: "Hindi",
    value: "hindi",
  },
  {
    text: "Russian",
    value: "russian",
  },
  {
    text: "Bengali",
    value: "bengali",
  },
  {
    text: "Urdu",
    value: "urdu",
  },
  {
    text: "Farsi",
    value: "farsi",
  },
  {
    text: "Pushto",
    value: "pushto",
  },
];

export const ROLE_AGENT_OPTIONS = [
  {
    text: "CEO",
    value: "ceo",
  },
  {
    text: "Head of Primary Sales",
    value: "head of primary sales",
  },
  {
    text: "Head Of Secondary Sales",
    value: "head of secondary sales",
  },
  {
    text: "Senior Sales Manager",
    value: "senior sales manager",
  },
  {
    text: "Sales Officer",
    value: "sales officer",
  },
];

export enum INPUT_LIST {
  Sell = "Seller",
  Rent = "Tenant",
}

export enum OPERATION {
  SALE = "Sale",
  RENT = "Rent",
}

export enum OPERATION_TYPES {
  FOR_SALE = "for-sale",
  FOR_RENT = "for-rent",
}

export enum QUANTITY_OPTIONS {
  ANY = "Any",
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export const FORM_NEWSLETTER = {
  email: "",
  terms: false,
};

export const REASON_OPTIONS = [
  {
    text: "Sell",
    value: "Seller",
  },
  {
    text: "Rent",
    value: "Tenant",
  },
  {
    text: "Rent my property",
    value: "Landlord",
  },
];

export const REASON_TYPE = [
  {
    text: "Sale",
    value: "Sale",
  },
  {
    text: "Rent",
    value: "Rent",
  },
  {
    text: "Other",
    value: "Other",
  },
];

export const REASON_GENERAL_OPTIONS = [
  {
    text: "Buy",
    value: "Buyer",
  },
  {
    text: "Sell",
    value: "Seller",
  },
  {
    text: "Rent",
    value: "Tenant",
  },
  {
    text: "Rent my property",
    value: "Landlord",
  },
];

export const SORT_DEVELOPER_OPTIONS = [
  {
    text: "More projects",
    value: "more-projects",
  },
  {
    text: "Fewer projects",
    value: "fewer-projects",
  },
];

export const PROJECT_TYPE_OPTIONS = [
  {
    text: "Apartments",
    value: "apartment",
  },
  {
    text: "Flats",
    value: "flat",
  },
  {
    text: "Studios",
    value: "studio",
  },
  {
    text: "Villas",
    value: "villa",
  },
  {
    text: "Mansions",
    value: "mansion",
  },
  {
    text: "Townhouses",
    value: "townhouse",
  },
  {
    text: "Waterfront Properties",
    value: "waterfront property",
  },
];

export const DEVELOPERS_BY_AREA_OPTIONS = [
  {
    text: "Sobha Realty",
    value: "sobha-realty",
    logo: "sobha-realty-logo", // Replace with real asset path if used
    projects: 0,
  },
  {
    text: "Nakheel Properties",
    value: "nakheel-properties",
    logo: "nakheel-properties-logo",
    projects: 0,
  },
  {
    text: "Dubai Properties",
    value: "dubai-properties",
    logo: "dubai-properties-logo",
    projects: 0,
  },
  {
    text: "Nshama Properties",
    value: "nshama-properties",
    logo: "nshama-properties-logo",
    projects: 0,
  },
  {
    text: "Meraas",
    value: "meraas",
    logo: "meraas-logo",
    projects: 1,
  },
  {
    text: "DAMAC Properties",
    value: "damac-properties",
    logo: "damac-properties-logo",
    projects: 0,
  },
  {
    text: "Ellington Properties",
    value: "ellington-properties",
    logo: "ellington-properties-logo",
    projects: 0,
  },
  {
    text: "Omniyat",
    value: "omniyat",
    logo: "omniyat-logo",
    projects: 0,
  },
  {
    text: "Binghatti",
    value: "binghatti",
    logo: "binghatti-logo",
    projects: 0,
  },
  {
    text: "Emaar",
    value: "emaar",
    logo: "emaar-logo",
    projects: 0,
  },
];

export const COMPLETION_STATUS_OPTIONS = [
  {
    text: "New Developments",
    value: "All",
  },
  {
    text: "Ready to Move",
    value: "ready-to-move",
  },
];

export const SORT_AREAS_OPTIONS = [
  {
    text: "Highest starting price",
    value: "highest",
  },
  {
    text: "Lowest starting price",
    value: "lowest",
  },
];

export const SORT_PROPERTY_OPTIONS = [
  {
    text: "Highest starting price",
    value: "highest",
  },
  {
    text: "Lowest starting price",
    value: "lowest",
  },
];

export enum SortPrice {
  Highest = "highest",
  Lowest = "lowest",
}

export enum API_PROPERTY_STATUS {
  DEVELOPMENT = "new-developments",
  READY_MOVE = "ready-to-move",
}

export enum PROPERTY_STATUS {
  OFF_PLAN = "Off Plan",
  COMPLETED = "Completed",
}

export enum ApiConditionalTypes {
  APPROVED = "approved",
  AVAILABLE = "available",
  PROPERTYFINDER = "propertyfinder",
}

export const PROPERTY_FILTER_QUERY = {
  location: "",
  property_type: "",
  status: "",
  operation: "",
  featured: false,
  sort: "",
  price_min: 0,
  price_max: 0,
  size_min: 0,
  size_max: 0,
  beds: 0,
  baths: 0,
  page: 1,
  limit: 12,
};

export const INITIAL_FORM_HOME_SEARCH = {
  operation: "",
  location: "",
  property_type: "",
};

export const PROPERTY_TYPES = [
  {
    text: "Apartment",
    value: "apartment",
  },
  {
    text: "Villa",
    value: "villa",
  },
  {
    text: "Townhouse",
    value: "townhouse",
  },
  {
    text: "Penthouse",
    value: "penthouse",
  },
  {
    text: "Studio",
    value: "studio",
  },
  {
    text: "Flat",
    value: "flat",
  },
  {
    text: "Office",
    value: "office",
  },
  {
    text: "Compound",
    value: "compound",
  },
  {
    text: "Duplex",
    value: "duplex",
  },
  {
    text: "Full Floor",
    value: "full floor",
  },
  {
    text: "Half Floor",
    value: "half floor",
  },
  {
    text: "Whole Building",
    value: "whole building",
  },
  {
    text: "Land",
    value: "land",
  },
  {
    text: "Bulk Sale Unit",
    value: "bulk sale unit",
  },
  {
    text: "Bungalow",
    value: "bungalow",
  },
  {
    text: "Garage",
    value: "garage",
  },
  {
    text: "Warehouse",
    value: "warehouse",
  },
];

export const PROJECT_TYPES = [
  {
    value: "Apartment",
    key: "apartment",
  },
  {
    value: "Villa",
    key: "villa",
  },
  {
    value: "Townhouse",
    key: "townhouse",
  },
  {
    value: "Penthouse",
    key: "penthouse",
  },
  {
    value: "Duplex",
    key: "duplex",
  },
  {
    value: "Hotel Apartment",
    key: "hotel-apartment",
  },
];

export const INITIAL_PROJECT_FILTER = {
  q: "",
  project_type: "",
  status: "", // ← añadimos Status
};

export const FILTER_PRICE = [
  { label: "300,000", key: 300000 },
  { label: "400,000", key: 400000 },
  { label: "500,000", key: 500000 },
  { label: "600,000", key: 600000 },
  { label: "700,000", key: 700000 },
  { label: "800,000", key: 800000 },
  { label: "900,000", key: 900000 },
  { label: "1,000,000", key: 1000000 },
  { label: "1,100,000", key: 1100000 },
  { label: "1,200,000", key: 1200000 },
  { label: "1,300,000", key: 1300000 },
  { label: "1,400,000", key: 1400000 },
  { label: "1,500,000", key: 1500000 },
  { label: "1,600,000", key: 1600000 },
  { label: "1,700,000", key: 1700000 },
  { label: "1,800,000", key: 1800000 },
  { label: "1,900,000", key: 1900000 },
  { label: "2,000,000", key: 2000000 },
  { label: "2,100,000", key: 2100000 },
  { label: "2,200,000", key: 2200000 },
  { label: "2,300,000", key: 2300000 },
  { label: "2,400,000", key: 2400000 },
  { label: "2,500,000", key: 2500000 },
  { label: "2,600,000", key: 2600000 },
  { label: "2,700,000", key: 2700000 },
  { label: "2,800,000", key: 2800000 },
  { label: "2,900,000", key: 2900000 },
  { label: "3,000,000", key: 3000000 },
  { label: "3,250,000", key: 3250000 },
  { label: "3,500,000", key: 3500000 },
  { label: "3,750,000", key: 3750000 },
  { label: "4,000,000", key: 4000000 },
  { label: "4,250,000", key: 4250000 },
  { label: "4,500,000", key: 4500000 },
  { label: "5,000,000", key: 5000000 },
  { label: "6,000,000", key: 6000000 },
  { label: "7,000,000", key: 7000000 },
  { label: "8,000,000", key: 8000000 },
  { label: "9,000,000", key: 9000000 },
  { label: "10,000,000", key: 10000000 },
  { label: "25,000,000", key: 25000000 },
  { label: "50,000,000", key: 50000000 },
  { label: "75,000,000", key: 75000000 },
  { label: "100,000,000", key: 100000000 },
];

export const FILTER_SIZE = [
  { label: "500", key: 500 },
  { label: "600", key: 600 },
  { label: "700", key: 700 },
  { label: "800", key: 800 },
  { label: "900", key: 900 },
  { label: "1,000", key: 1000 },
  { label: "1,100", key: 1100 },
  { label: "1,200", key: 1200 },
  { label: "1,300", key: 1300 },
  { label: "1,400", key: 1400 },
  { label: "1,500", key: 1500 },
  { label: "1,600", key: 1600 },
  { label: "1,800", key: 1800 },
  { label: "2,000", key: 2000 },
  { label: "2,200", key: 2200 },
  { label: "2,400", key: 2400 },
  { label: "2,600", key: 2600 },
  { label: "2,800", key: 2800 },
  { label: "3,000", key: 3000 },
  { label: "3,200", key: 3200 },
  { label: "3,400", key: 3400 },
  { label: "3,600", key: 3600 },
  { label: "3,800", key: 3800 },
  { label: "4,200", key: 4200 },
  { label: "4,600", key: 4600 },
  { label: "5,000", key: 5000 },
  { label: "5,400", key: 5400 },
  { label: "5,800", key: 5800 },
  { label: "6,200", key: 6200 },
  { label: "6,600", key: 6600 },
  { label: "7,000", key: 7000 },
  { label: "7,400", key: 7400 },
  { label: "7,800", key: 7800 },
  { label: "8,200", key: 8200 },
  { label: "8,600", key: 8600 },
  { label: "9,000", key: 9000 },
];

export const WANT_TO_OPTIONS = [
  {
    text: "Sale",
    value: "Sell",
  },
  {
    text: "Rent",
    value: "Rent",
  },
  {
    text: "Temporary Rental",
    value: "Temporary Rent",
  },
];
