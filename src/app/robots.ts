import type { MetadataRoute } from "next";
import { ENVIRONMENT } from "@/config/env.config";

const BASE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_URL || ENVIRONMENT.OFFICIAL_WEBSITE_URL;

/**
 * ROBOTS.TXT
 * ===========
 * Configuración de robots para motores de búsqueda.
 * Lista todos los sitemaps disponibles para indexación.
 *
 * SITEMAPS GENERADOS:
 * - /sitemap/static.xml → Páginas estáticas (home, for-sale, for-rent, off-plan, 
 *   properties-by-areas, developers, our-team, blogs, about-us, about-zayyan-amani,
 *   lead-magnet, list-your-property, privacy-policy, terms-and-conditions, cookie-policy)
 * - /sitemap/properties-sale.xml → Propiedades en venta
 * - /sitemap/properties-rent.xml → Propiedades en renta
 * - /sitemap/projects.xml → Proyectos off-plan
 * - /sitemap/developers.xml → Desarrolladores
 * - /sitemap/areas.xml → Áreas/Comunidades
 * - /sitemap/blogs.xml → Blog
 * - /sitemap/team.xml → Equipo
 * - /sitemap/services.xml → Servicios
 * - /sitemap/seo.xml → Páginas SEO
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general para todos los bots
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/actions/", "/_next/", "/thank-you", "/*?*"],
      },
      // Bloqueo de bots de AI
      {
        userAgent: "Amazonbot",
        disallow: "/",
      },
      {
        userAgent: "Applebot-Extended",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "meta-externalagent",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      {
        userAgent: "cohere-ai",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        disallow: "/",
      },
    ],
    sitemap: [
      // Sitemap de páginas estáticas
      `${BASE_URL}/sitemap/static.xml`,

      // Sitemaps de propiedades
      `${BASE_URL}/sitemap/properties-sale.xml`,
      `${BASE_URL}/sitemap/properties-rent.xml`,

      // Sitemap de proyectos off-plan
      `${BASE_URL}/sitemap/projects.xml`,

      // Sitemap de desarrolladores
      `${BASE_URL}/sitemap/developers.xml`,

      // Sitemap de áreas
      `${BASE_URL}/sitemap/areas.xml`,

      // Sitemap de blog
      `${BASE_URL}/sitemap/blogs.xml`,

      // Sitemap de equipo
      `${BASE_URL}/sitemap/team.xml`,

      // Sitemap de servicios
      `${BASE_URL}/sitemap/services.xml`,
    ],
  };
}