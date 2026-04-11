import { PropertyResponse } from "@/interfaces";

export const mockPropertiesResponse: PropertyResponse = {
  data: [
    {
      id: 1,
      attributes: {
        Title: "Luxury Penthouse in Dubai Marina",
        Description: "Stunning penthouse with panoramic views of Dubai Marina and the Arabian Gulf. This exceptional property features high-end finishes, smart home technology, and access to world-class amenities. Perfect for those seeking luxury living in the heart of Dubai.",
        Price: "8,500,000",
        Total_area: "3,500 sq.ft",
        Bedrooms: 4,
        Bathrooms: 5,
        Operation: "Sale",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example1",
        Property_type: "Penthouse",
        Address: "Dubai Marina, Marina Promenade",
        Location: "Dubai Marina",
        Amenities: [
          "Swimming Pool",
          "Gym",
          "24/7 Security",
          "Concierge Service",
          "Valet Parking",
          "Private Beach Access",
          "Spa & Sauna"
        ],
        Features: [
          "Smart Home System",
          "Floor-to-ceiling Windows",
          "Private Terrace",
          "Maid's Room",
          "Built-in Wardrobes",
          "Central A/C",
          "Premium Kitchen Appliances"
        ],
        slug: "luxury-penthouse-dubai-marina",
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-11-10"),
        publishedAt: new Date("2024-01-20"),
        locale: "en",
        Main_image: {
          data: {
            id: 101,
            attributes: {
              url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 101,
              attributes: {
                url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
              }
            },
            {
              id: 102,
              attributes: {
                url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
              }
            },
            {
              id: 103,
              attributes: {
                url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
              }
            },
            {
              id: 104,
              attributes: {
                url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              }
            },
            {
              id: 105,
              attributes: {
                url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 1,
            attributes: {
              Area_name: "Dubai Marina",
              slug: "dubai-marina"
            }
          }
        }
      }
    },
    {
      id: 2,
      attributes: {
        Title: "Modern Villa in Palm Jumeirah",
        Description: "Exclusive beachfront villa offering unparalleled luxury and privacy. This magnificent property boasts contemporary architecture, private beach access, and breathtaking views of the Arabian Gulf. An ideal retreat for discerning buyers.",
        Price: "25,000,000",
        Total_area: "8,200 sqft",
        Bedrooms: 6,
        Bathrooms: 7,
        Operation: "Sale",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example2",
        Property_type: "Villa",
        Address: "Palm Jumeirah, Frond M",
        Location: "Palm Jumeirah",
        Amenities: [
          "Private Beach",
          "Infinity Pool",
          "Private Gym",
          "Home Cinema",
          "Wine Cellar",
          "Staff Quarters",
          "Private Elevator"
        ],
        Features: [
          "Smart Home Automation",
          "Panoramic Sea Views",
          "Landscaped Garden",
          "Private Jetty",
          "6-Car Garage",
          "Outdoor Kitchen",
          "Security System"
        ],
        slug: "modern-villa-palm-jumeirah",
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-11-11"),
        publishedAt: new Date("2024-02-05"),
        locale: "en",
        Main_image: {
          data: {
            id: 201,
            attributes: {
              url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 201,
              attributes: {
                url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80"
              }
            },
            {
              id: 202,
              attributes: {
                url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
              }
            },
            {
              id: 203,
              attributes: {
                url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80"
              }
            },
            {
              id: 204,
              attributes: {
                url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80"
              }
            },
            {
              id: 205,
              attributes: {
                url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
              }
            },
            {
              id: 206,
              attributes: {
                url: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 2,
            attributes: {
              Area_name: "Palm Jumeirah",
              slug: "palm-jumeirah"
            }
          }
        }
      }
    },
    {
      id: 3,
      attributes: {
        Title: "Elegant Apartment in Downtown Dubai",
        Description: "Sophisticated apartment in the iconic Burj Khalifa district. Enjoy stunning city views, premium finishes, and proximity to Dubai Mall and world-renowned attractions. Perfect for urban living at its finest.",
        Price: "3,200,000",
        Total_area: "1,850 sqft",
        Bedrooms: 3,
        Bathrooms: 3,
        Operation: "Sale",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example3",
        Property_type: "Apartment",
        Address: "Downtown Dubai, Boulevard Heights",
        Location: "Downtown Dubai",
        Amenities: [
          "Infinity Pool",
          "State-of-the-art Gym",
          "Children's Play Area",
          "BBQ Area",
          "24/7 Security",
          "Covered Parking",
          "Retail Outlets"
        ],
        Features: [
          "Burj Khalifa View",
          "Modern Kitchen",
          "Balcony",
          "Walk-in Closet",
          "Premium Flooring",
          "Central Cooling",
          "Storage Room"
        ],
        slug: "elegant-apartment-downtown-dubai",
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-11-09"),
        publishedAt: new Date("2024-03-15"),
        locale: "en",
        Main_image: {
          data: {
            id: 301,
            attributes: {
              url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 301,
              attributes: {
                url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80"
              }
            },
            {
              id: 302,
              attributes: {
                url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80"
              }
            },
            {
              id: 303,
              attributes: {
                url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80"
              }
            },
            {
              id: 304,
              attributes: {
                url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 3,
            attributes: {
              Area_name: "Downtown Dubai",
              slug: "downtown-dubai"
            }
          }
        }
      }
    },
    {
      id: 4,
      attributes: {
        Title: "Spacious Townhouse in Arabian Ranches",
        Description: "Family-friendly townhouse in a prestigious gated community. Features spacious living areas, private garden, and access to excellent community facilities including golf course, parks, and schools.",
        Price: "4,500,000",
        Total_area: "2,850 sqft",
        Bedrooms: 4,
        Bathrooms: 4,
        Operation: "Sale",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example4",
        Property_type: "Townhouse",
        Address: "Arabian Ranches, Palmera 3",
        Location: "Arabian Ranches",
        Amenities: [
          "Community Pool",
          "Golf Course",
          "Tennis Courts",
          "Kids Play Area",
          "BBQ Areas",
          "Community Center",
          "Retail Center"
        ],
        Features: [
          "Private Garden",
          "Covered Parking",
          "Study Room",
          "Upgraded Kitchen",
          "Fitted Wardrobes",
          "Laundry Room",
          "Guest Powder Room"
        ],
        slug: "spacious-townhouse-arabian-ranches",
        createdAt: new Date("2024-04-05"),
        updatedAt: new Date("2024-11-08"),
        publishedAt: new Date("2024-04-10"),
        locale: "en",
        Main_image: {
          data: {
            id: 401,
            attributes: {
              url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 401,
              attributes: {
                url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80"
              }
            },
            {
              id: 402,
              attributes: {
                url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80"
              }
            },
            {
              id: 403,
              attributes: {
                url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80"
              }
            },
            {
              id: 404,
              attributes: {
                url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80"
              }
            },
            {
              id: 405,
              attributes: {
                url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 4,
            attributes: {
              Area_name: "Arabian Ranches",
              slug: "arabian-ranches"
            }
          }
        }
      }
    },
    {
      id: 5,
      attributes: {
        Title: "Studio Apartment for Rent in Business Bay",
        Description: "Modern studio apartment in the heart of Business Bay. Fully furnished with contemporary design, offering city views and easy access to metro station. Ideal for professionals and investors.",
        Price: "55,000",
        Total_area: "550 sqft",
        Bedrooms: 1,
        Bathrooms: 1,
        Operation: "Rent",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example5",
        Property_type: "Studio",
        Address: "Business Bay, Executive Tower B",
        Location: "Business Bay",
        Amenities: [
          "Swimming Pool",
          "Gym",
          "Sauna",
          "Steam Room",
          "Covered Parking",
          "Security",
          "Maintenance"
        ],
        Features: [
          "Fully Furnished",
          "Balcony",
          "Built-in Kitchen",
          "City View",
          "High Floor",
          "Near Metro",
          "Central A/C"
        ],
        slug: "studio-apartment-business-bay",
        createdAt: new Date("2024-05-20"),
        updatedAt: new Date("2024-11-12"),
        publishedAt: new Date("2024-05-25"),
        locale: "en",
        Main_image: {
          data: {
            id: 501,
            attributes: {
              url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 501,
              attributes: {
                url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=80"
              }
            },
            {
              id: 502,
              attributes: {
                url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&q=80"
              }
            },
            {
              id: 503,
              attributes: {
                url: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 5,
            attributes: {
              Area_name: "Business Bay",
              slug: "business-bay"
            }
          }
        }
      }
    },
    {
      id: 6,
      attributes: {
        Title: "Luxurious Villa in Emirates Hills",
        Description: "Prestigious custom-built villa in the exclusive Emirates Hills community. This architectural masterpiece features premium finishes, extensive outdoor space, and golf course views. The epitome of luxury living in Dubai.",
        Price: "35,000,000",
        Total_area: "12,500 sqft",
        Bedrooms: 7,
        Bathrooms: 9,
        Operation: "Sale",
        YoutubeURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        MatterportURL: "https://my.matterport.com/show/?m=example6",
        Property_type: "Villa",
        Address: "Emirates Hills, Sector E",
        Location: "Emirates Hills",
        Amenities: [
          "Private Pool",
          "Home Theater",
          "Private Gym",
          "Spa Room",
          "Wine Cellar",
          "Staff Accommodation",
          "Smart Home System"
        ],
        Features: [
          "Golf Course View",
          "Italian Marble Flooring",
          "Custom Kitchen",
          "Master Suite with Terrace",
          "Elevator",
          "8-Car Garage",
          "Landscaped Gardens",
          "Outdoor Entertainment Area"
        ],
        slug: "luxurious-villa-emirates-hills",
        createdAt: new Date("2024-06-12"),
        updatedAt: new Date("2024-11-11"),
        publishedAt: new Date("2024-06-18"),
        locale: "en",
        Main_image: {
          data: {
            id: 601,
            attributes: {
              url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80"
            }
          }
        },
        Images: {
          data: [
            {
              id: 601,
              attributes: {
                url: "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80"
              }
            },
            {
              id: 602,
              attributes: {
                url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
              }
            },
            {
              id: 603,
              attributes: {
                url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80"
              }
            },
            {
              id: 604,
              attributes: {
                url: "https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=1200&q=80"
              }
            },
            {
              id: 605,
              attributes: {
                url: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80"
              }
            },
            {
              id: 606,
              attributes: {
                url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"
              }
            }
          ]
        },
        area_ID: {
          data: {
            id: 6,
            attributes: {
              Area_name: "Emirates Hills",
              slug: "emirates-hills"
            }
          }
        }
      }
    }
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 6
    }
  }
};
