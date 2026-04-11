import { ENVIRONMENT } from "@/config/env.config";

export const homeQuery = {
  populate: {
    Hero: true,
    Featured_properties_1: true,
    Featured_properties_2: true,
    Areas: true,
    Blog: true,
    Off_plan: true,
    Services: true,
    Contact_us: {
      populate: ["Section"],
    },
    Featured_numbers: {
      populate: ["Numeric_item_1", "Numeric_item_2", "Numeric_item_3"],
    },
    Contact_Us: {
      populate: ["Section"],
    },
    Why_us: {
      populate: ["About_item"],
    },
    About_us: {
      populate: {
        Image: { fields: ["url"] },
      },
    },
    Instagram_section: true,
    Podcast_section: {
      fields: ["Title", "Kicker", "Show"],
      populate: {
        Podcast: true,
      },
    },
  },
};

export const listYourPropertyQuery = {
  populate: {
    Why_us: {
      populate: ["About_item"],
    },
  },
};

export const homeWhyUsQuery = {
  populate: {
    Why_us: {
      populate: ["About_item"],
    },
  },
};

export const propertyInfoQuery = {
  populate: {
    Main_image: { fields: ["url"] },
    Images: { fields: ["url"] },
    area_ID: { fields: ["Area_name", "slug"] },
  },
};

export const propertyListingQuery = {
  fields: [
    "Title",
    "slug",
    "Location",
    "Address",
    "Location",
    "Price",
    "Bathrooms",
    "Bedrooms",
    "Total_area",
    "Operation",
    "createdAt",
  ],
  populate: {
    Images: { fields: ["url"] },
  },
};

export const projectListingQuery = {
  fields: [
    "Title",
    "slug",
    "Meta_description",
    "Starting_price",
    "Subtitle_1",
    "Big_title",
  ],
  populate: {
    Images: { fields: ["url"] },
    Logo: { fields: ["url"] },
    Main_image: { fields: ["url"] },
  },
};

export const latestProjectListingQuery = {
  fields: [
    "Title",
    "slug",
    "Meta_description",
    "Starting_price",
    "Subtitle_1",
    "Big_title",
    "Handover",
    "Starting_price",
    "Project_type",
  ],
  populate: {
    Images: { fields: ["url", "formats"] },
    Logo: { fields: ["url"] },
    developer_ID: {
      fields: ["Name", "slug"],
      populate: {
        Logo: { fields: ["url"] },
      },
    },
    area_ID: {
      fields: ["Area_name", "slug"],
    },
    Main_image: { fields: ["url"] },
  },
};

export const serviceListingQuery = {
  fields: ["Title", "slug", "Introduction"],
  populate: {
    Main_image: { fields: ["url"] },
  },
};

export const reviewListingQuery = {
  fields: ["Name", "Rating", "Testimony_part1", "Testimony_part2"],
};

export const serviceQuery = {
  populate: {
    Testimony: true,
    Main_image: { fields: ["url"] },
    Service_content: {
      populate: {
        Image: { fields: ["url"] },
      },
    },
  },
};

export const agentListingQuery = {
  fields: ["Name", "Role", "Language", "Broker_number", "slug"],
  populate: {
    Image: { fields: ["url"] },
  },
};

export const areaQuery = {
  populate: {
    Image: { fields: ["url"] },
  },
};

export const areaListingQuery = {
  fields: ["Area_name", "slug"],
};

export const blogListingQuery = {
  fields: ["Title", "slug", "Date_published", "createdAt"],
  populate: {
    Main_image: { fields: ["url"] },
  },
};

export const projectQuery = {
  populate: {
    Main_image: { fields: ["url"] },
    Brochure: { fields: ["url"] },
    Images: { fields: ["url", "formats"] },
    Content_image: { fields: ["url"] },
    Atmosphere_image: { fields: ["url"] },
    Logo: { fields: ["url"] },
    Nearby_places: {
      populate: {
        Place: true,
      },
    },
    Floor_plans: {
      populate: {
        // así sí traés la url de la imagen de floor plan
        Floor_plan_image: { fields: ["url"] },
      },
    },
    Payment_plans: true,
    developer_ID: {
      fields: ["Name", "slug"],
      populate: {
        Logo: { fields: ["url"] },
      },
    },
    area_ID: {
      fields: ["Area_name", "slug"],
      // Featured: true,
    },
    Project_number: {
      populate: {
        Project_number: true,
        QR: { fields: ["url"] },
      },
    },
  },
};

export const projectPageQuery = {
  populate: {
    Why_us: {
      populate: ["About_item"],
    },
    Contact_off_plan: {
      populate: {
        Image: { fields: ["url"] },
      },
    },
    Get_started: {
      populate: ["Item_get_started"],
    },
    Why_dubai: {
      populate: {
        Item_why_dubai: {
          populate: {
            Image: { fields: ["url"] },
          },
        },
      },
    },
  },
};

export const agentQuery = {
  populate: {
    Contact: true,
    Image: { fields: ["url"] },
  },
};

// old
export const developerQuery = {
  populate: {
    Logo: { fields: ["url"] },
  },
};

export const propertySEOQuery = {
  fields: ["H1", "slug", "Visible"],
  populate: ["Filters"],
  pagination: {
    pageSize: ENVIRONMENT.MAX_PROPERTIES_SEO,
  },
};

export const reviewsQuery = {
  populate: {
    Hero: {
      fields: ["Average_reviews", "Number_reviews"],
    },
  },
};

export const aboutUsQuery = {
  populate: {
    Hero: {
      populate: "*",
    },
    Hero_about: {
      populate: "*",
    },
    Section_1: {
      populate: {
        Image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
      },
    },
    Section_2: {
      populate: {
        Image: {
          fields: ["url", "alternativeText", "width", "height"],
        },
      },
    },
    About: {
      populate: "*",
    },
    Why_us: {
      populate: {
        About_item: {
          populate: {
            Icon: {
              fields: ["url"],
            },
          },
        },
      },
    },
    localizations: {
      populate: "*",
    },
  },
};

export const aboutUsWhyUsQuery = {
  populate: {
    Why_us: {
      populate: {
        About_item: {
          populate: {
            Icon: {
              fields: ["url"],
            },
          },
        },
      },
    },
  },
};
