import type { MetadataRoute } from "next";
import { APIService } from "@/services/api.service";
import { ENVIRONMENT } from "@/config/env.config";
import { OPERATION_TYPES } from "@/config/constant.config";
import { filterNonNull } from "@/utils/utils";

const BASE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || ENVIRONMENT.OFFICIAL_WEBSITE_URL;

/**
 * SITEMAP PRINCIPAL
 * ==================
 * Genera un sitemap completo con todas las URLs del sitio.
 * Usa generateSitemaps() para dividir en múltiples archivos.
 *
 * ESTRUCTURA DEL SITIO:
 * =====================
 *
 * NIVEL 1 - PÁGINAS PRINCIPALES
 * ├── / (Home)
 * ├── /for-sale (Propiedades en Venta)
 * ├── /for-rent (Propiedades en Renta)
 * ├── /off-plan (Proyectos Off-Plan)
 * ├── /properties-by-areas (Propiedades por Áreas)
 * ├── /developers (Desarrolladores)
 * ├── /our-team (Nuestro Equipo)
 * ├── /blogs (Blog)
 * ├── /about-us (Sobre Nosotros)
 * ├── /about-zayyan-amani (Sobre Zayyan Amani)
 * ├── /lead-magnet (Lead Magnet)
 * └── /list-your-property (Listar Propiedad)
 *
 * NIVEL 2 - PÁGINAS DINÁMICAS
 * ├── /for-sale/[slug] → Detalle de propiedad en venta
 * ├── /for-rent/[slug] → Detalle de propiedad en renta
 * ├── /off-plan/[slug] → Detalle de proyecto off-plan
 * ├── /properties-by-areas/[slug] → Propiedades por área
 * ├── /developers/[slug] → Detalle de desarrollador
 * ├── /our-team/[slug] → Perfil de agente
 * ├── /blogs/[slug] → Artículo de blog
 * ├── /services/[slug] → Detalle de servicio
 * └── /search/[slug] → Búsqueda SEO
 *
 * NIVEL 3 - PÁGINAS LEGALES
 * ├── /privacy-policy
 * ├── /terms-and-conditions
 * └── /cookie-policy
 */

// Tipos de sitemap
type SitemapType =
  | "static"
  | "properties-sale"
  | "properties-rent"
  | "projects"
  | "developers"
  | "areas"
  | "blogs"
  | "team"
  | "services"
  | "seo";

export async function generateSitemaps() {
  const sitemapIds: { id: SitemapType }[] = [
    { id: "static" },
    { id: "properties-sale" },
    { id: "properties-rent" },
    { id: "projects" },
    { id: "developers" },
    { id: "areas" },
    { id: "blogs" },
    { id: "team" },
    { id: "services" },
    { id: "seo" },
  ];

  return sitemapIds;
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = (await props.id) as SitemapType;
  const currentDate = new Date();

  switch (id) {
    case "static":
      return getStaticPages(currentDate);
    case "properties-sale":
      return getPropertiesSitemap("Sale", OPERATION_TYPES.FOR_SALE);
    case "properties-rent":
      return getPropertiesSitemap("Rent", OPERATION_TYPES.FOR_RENT);
    case "projects":
      return getProjectsSitemap();
    case "developers":
      return getDevelopersSitemap();
    case "areas":
      return getAreasSitemap();
    case "blogs":
      return getBlogsSitemap();
    case "team":
      return getTeamSitemap();
    case "services":
      return getServicesSitemap();
    default:
      return [];
  }
}

// ============================================
// PÁGINAS ESTÁTICAS
// ============================================
function getStaticPages(currentDate: Date): MetadataRoute.Sitemap {
  return [
    // Páginas principales
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/for-sale`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/for-rent`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/off-plan`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/properties-by-areas`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/developers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-team`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about-zayyan-amani`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/lead-magnet`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/list-your-property`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // Páginas legales
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

// ============================================
// PROPIEDADES (VENTA / RENTA)
// ============================================
async function getPropertiesSitemap(
  operation: "Sale" | "Rent",
  operationPath: string
): Promise<MetadataRoute.Sitemap> {
  try {
    const properties = await APIService.findProperties({
      filters: { Operation: { $eq: operation } },
      fields: ["slug", "updatedAt", "createdAt"],
      pagination: { pageSize: 5000 },
      sort: "createdAt:desc",
    });

    return properties.data.map((property) => ({
      url: `${BASE_URL}/${operationPath}/${property.attributes.slug}`,
      lastModified: new Date(
        property.attributes.updatedAt || property.attributes.createdAt
      ),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error(`Error fetching ${operation} properties:`, error);
    return [];
  }
}

// ============================================
// PROYECTOS OFF-PLAN
// ============================================
async function getProjectsSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const projects = await APIService.findProjects({
      fields: ["slug", "updatedAt", "createdAt"],
      pagination: { pageSize: 5000 },
      sort: "createdAt:desc",
    });

    return projects.data.map((project) => ({
      url: `${BASE_URL}/off-plan/${project.attributes.slug}`,
      lastModified: new Date(
        project.attributes.updatedAt || project.attributes.createdAt
      ),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// ============================================
// DESARROLLADORES
// ============================================
async function getDevelopersSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const developers = await APIService.findDevelopers({
      fields: ["slug", "updatedAt", "createdAt"],
      pagination: { pageSize: 1000 },
      sort: "createdAt:desc",
    });

    return developers.data.map((developer) => ({
      url: `${BASE_URL}/developers/${developer.attributes.slug}`,
      lastModified: new Date(
        developer.attributes.updatedAt || developer.attributes.createdAt
      ),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching developers:", error);
    return [];
  }
}

// ============================================
// ÁREAS / COMUNIDADES
// ============================================
async function getAreasSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const areas = await APIService.findAreas({
      fields: ["slug", "updatedAt", "createdAt"],
      pagination: { pageSize: 1000 },
      sort: "createdAt:desc",
    });

    return areas.data.map((area) => ({
      url: `${BASE_URL}/properties-by-areas/${area.attributes.slug}`,
      lastModified: new Date(
        area.attributes.updatedAt || area.attributes.createdAt
      ),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching areas:", error);
    return [];
  }
}

// ============================================
// BLOG
// ============================================
async function getBlogsSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const blogs = await APIService.findBlogs({
      filters: filterNonNull({
        Date_published: filterNonNull({
          $lte: new Date().toISOString(),
        }),
      }),
      fields: ["slug", "updatedAt", "createdAt", "Date_published"],
      pagination: { pageSize: 5000 },
      sort: "Date_published:desc",
    });

    return blogs.data.map((blog) => ({
      url: `${BASE_URL}/blogs/${blog.attributes.slug}`,
      lastModified: new Date(
        blog.attributes.updatedAt ||
          blog.attributes.Date_published ||
          blog.attributes.createdAt
      ),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// ============================================
// EQUIPO
// ============================================
async function getTeamSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const agents = await APIService.findAgents({
      fields: ["slug", "updatedAt", "createdAt"],
      pagination: { pageSize: 500 },
      sort: "createdAt:desc",
    });

    return agents.data.map((agent) => ({
      url: `${BASE_URL}/our-team/${agent.attributes.slug}`,
      lastModified: new Date(
        agent.attributes.updatedAt || agent.attributes.createdAt
      ),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

// ============================================
// SERVICIOS
// ============================================
async function getServicesSitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const services = await APIService.findServices({});

    return services.map((service) => ({
      url: `${BASE_URL}/services/${service.attributes.slug}`,
      lastModified: new Date(
        service.attributes.updatedAt || service.attributes.createdAt
      ),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}