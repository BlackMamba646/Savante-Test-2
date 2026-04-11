import { ROUTING } from "@/config/constant.config";

/**
 * Determina si el botón de WhatsApp debe estar visible según la ruta
 * 
 * Rutas donde el botón está OCULTO:
 * - /privacy-policy
 * - /terms-and-conditions
 * - /cookie-policy
 * - /not-found
 * 
 * Todas las demás rutas muestran el botón por defecto.
 */
export function shouldShowWhatsAppButton(pathname: string): boolean {
  // Rutas donde el botón debe estar oculto
  const hiddenRoutes = [
    ROUTING.OFF_PLAN,              // /off-plan
    ROUTING.PRIVACY_POLICY,        // /privacy-policy
    ROUTING.TERMS_AND_CONDITIONS,  // /terms-and-conditions
    ROUTING.COOKIE_POLICY,         // /cookie-policy
    ROUTING.NOT_FOUND,             // /not-found
    ROUTING.SUCCESS,               // /thank-you
  ];

  // Verificar si la ruta actual está en la lista de rutas ocultas
  const shouldHide = hiddenRoutes.some(route => route === pathname);

  // Retornar true si NO debe ocultarse
  return !shouldHide;
}