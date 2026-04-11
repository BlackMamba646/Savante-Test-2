import { ENVIRONMENT } from "@/config/env.config";

interface ImageAttributes {
  url: string;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

/**
 * Obtiene la URL optimizada de una imagen según el formato preferido
 * @param attributes - Atributos de la imagen de Strapi
 * @param preferredFormat - Formato preferido: 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
 * @returns URL completa de la imagen con el dominio de la API
 */
export const getOptimizedImageUrl = (
  attributes: ImageAttributes | undefined,
  preferredFormat: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  if (!attributes?.url) {
    return '/images/fallback-image.webp';
  }

  // Si pide el original, devolver la URL original
  if (preferredFormat === 'original') {
    return ENVIRONMENT.API_URL + attributes.url;
  }

  // Intentar obtener el formato preferido, si no existe, usar el original
  const formatUrl = attributes.formats?.[preferredFormat]?.url;
  const finalUrl = formatUrl || attributes.url;

  return ENVIRONMENT.API_URL + finalUrl;
};

/**
 * Obtiene solo la ruta relativa de la imagen optimizada (sin el dominio)
 * @param attributes - Atributos de la imagen de Strapi
 * @param preferredFormat - Formato preferido
 * @returns Ruta relativa de la imagen
 */
export const getOptimizedImagePath = (
  attributes: ImageAttributes | undefined,
  preferredFormat: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  if (!attributes?.url) {
    return '/images/fallback-image.webp';
  }

  if (preferredFormat === 'original') {
    return attributes.url;
  }

  const formatUrl = attributes.formats?.[preferredFormat]?.url;
  return formatUrl || attributes.url;
};
