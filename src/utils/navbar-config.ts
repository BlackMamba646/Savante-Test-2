import { ROUTING } from "@/config/constant.config";

export interface NavbarConfig {
  theme: "light" | "dark";
  position: "absolute" | "relative" | "fixed";
}

/**
 * Configuración del Navbar según la ruta
 *
 * Rutas con theme="light" y position="relative":
 * - /for-sale
 * - /for-rent
 * - /off-plan
 * - /privacy-policy
 * - /terms-and-conditions
 * - /cookie-policy
 *
 * Rutas con theme="light" y position="absolute":
 * - /blogs (página padre de blogs - ROUTING.BLOGS)
 * - /blogs/[slug] (artículos individuales de blog)
 * - /for-sale/[slug] (propiedades individuales en venta)
 * - /for-rent/[slug] (propiedades individuales en renta)
 *
 * Rutas con theme="dark" y position="absolute":
 * - /our-blog (listado de blogs - ROUTING.OUR_BLOG)
 *
 * Todas las demás rutas usan theme="dark" y position="fixed" por defecto.
 */
export function getNavbarConfig(pathname: string): NavbarConfig {
  const lightRelativeRoutes = [
    ROUTING.FOR_SALE, // /for-sale
    ROUTING.FOR_RENT, // /for-rent
    ROUTING.OFF_PLAN, // /off-plan
    ROUTING.PRIVACY_POLICY, // /privacy-policy
    ROUTING.TERMS_AND_CONDITIONS, // /terms-and-conditions
    ROUTING.COOKIE_POLICY, // /cookie-policy
  ];

  // Verificar coincidencia EXACTA para light + relative
  const isLightRelative = lightRelativeRoutes.some(
    (route) => route === pathname
  );

  // Verificar si es ROUTING.BLOGS o sus hijos (light + fixed)
  const isBlogsRoute = pathname === ROUTING.BLOGS;

  const isPropertiesByAreasRoute = pathname === ROUTING.PROPERTIES_BY_AREAS;

  const isOurTeamRoute = pathname === ROUTING.OUR_TEAM || pathname.startsWith("/our-team/");

  // Verificar si es una propiedad individual (for-sale/[slug] o for-rent/[slug])
  const isPropertyDetail =
    pathname.startsWith("/for-sale/") || pathname.startsWith("/for-rent/");

  if (isLightRelative) {
    return { theme: "light", position: "relative" };
  }

  if (
    isBlogsRoute ||
    isPropertyDetail ||
    isPropertiesByAreasRoute ||
    isOurTeamRoute
  ) {
    return { theme: "light", position: "fixed" };
  }

  // Por defecto: todas las demás rutas (incluidas las sub-rutas)
  return { theme: "dark", position: "fixed" };
}
