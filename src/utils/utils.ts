import { SortPrice } from "@/config/constant.config";
import { ENVIRONMENT } from "@/config/env.config";
import qs from "qs";

import type { BooleanOptional, IStringifyOptions } from "qs";

export const QueryConvert = {
  toString: function (
    data: object,
    options?: IStringifyOptions<BooleanOptional>
  ) {
    return qs.stringify(data, {
      encodeValuesOnly: true,
      addQueryPrefix: true,
      skipNulls: true,
      ...options,
    });
  },
  toParse: function <T extends Record<string, any>>(value: string) {
    return qs.parse(value, { ignoreQueryPrefix: true }) as T;
  },
};

export const formatFeatures = {
  formatDate: function (time: string) {
    const value = new Intl.DateTimeFormat("en-US").format(new Date(time));
    return value.split("/").join(" / ");
  },
  formatCurrency: function (currency: number, code?: string) {
    let options = {};
    if (code) {
      options = { style: "currency", currency: code };
    }
    return new Intl.NumberFormat("en-US", options).format(currency);
  },
  formatNumber: function (value: number): string {
    if (isNaN(value)) return "N/A";
    return new Intl.NumberFormat("en-US").format(value);
  },
  formatPlaneDate: function (time: string) {
    const date = new Date(time);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    let m: string | number = month;
    let d: string | number = dt;

    if (dt < 10) {
      d = "0" + dt;
    }
    if (month < 10) {
      m = "0" + month;
    }
    return year + "-" + m + "-" + d;
  },
  formatDateWithMonth: function (dateStr: string) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  },
};

export const filterNonNull = (obj: object) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
};

export const formatDate = {
  init: function (options?: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat("en", options);
  },
  toNumberWithMonth: function (date: string) {
    const t = this.init({
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date.replaceAll("-", "/")));
    return t.replaceAll(", ", " ");
  },
};

export const capitalizeFirstLetter = (letter: string) => {
  return letter.charAt(0).toUpperCase() + letter.slice(1);
};

interface FormatTextSearchByQueryArgs {
  searchQuery: string;
  propertyType: string;
  operationType: string;
  location: string;
  totalItems: string | number;
  mode: "default" | "title";
  base: string;
}

export const formatTextSearchByQuery = (
  args: Partial<FormatTextSearchByQueryArgs>
) => {
  const {
    base,
    searchQuery,
    propertyType,
    operationType,
    location,
    totalItems = 0,
    mode = "default",
  } = args;

  const obj = { q: "", title: "" };

  const str = propertyType
    ? capitalizeFirstLetter(propertyType)
    : Number(totalItems) > 1
    ? "Properties"
    : "Property";
  obj.q = obj.q.concat(str);

  if (propertyType) {
    obj.title = capitalizeFirstLetter(propertyType);
  } else {
    obj.title = base || "Properties";
  }

  if (operationType) {
    obj.q = obj.q.concat(" for ", capitalizeFirstLetter(operationType));
    obj.title =
      obj.title + " for " + capitalizeFirstLetter(operationType.toLowerCase());
  }

  if (searchQuery) {
    obj.q = obj.q.concat(" in ", searchQuery);
  }
  if (location) {
    const formatLocation = location
      .split(" ")
      .map((el) => capitalizeFirstLetter(el))
      .join(" ");

    obj.title = obj.title + " in " + formatLocation;
  }

  return mode === "default" ? String(totalItems).concat(" ", obj.q) : obj.title;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFormData = <T extends Record<string, any>>(obj: T) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => formData.append(key, obj[key]));
  return formData;
};

export function generateCanonicalURL(pathname: string) {
  return ENVIRONMENT.OFFICIAL_WEBSITE_URL + pathname;
}

export function valuesToHTMLString(formData: FormData) {
  return `
    <div>
        <strong>Full Name</strong>: ${
          formData.get("first_name")?.toString() || ""
        } ${formData.get("last_name")?.toString() || ""}
        <br />
        <strong>Email</strong>: ${formData.get("email")?.toString() || "-"}
        <br />
        <strong>Phone</strong>: ${formData.get("phone")?.toString() || "-"}
        <br />
        <strong>Message</strong>: ${formData.get("note")?.toString() || "-"}
        <br />
        <strong>Reason</strong>: ${formData.get("type")?.toString() || "-"}
        <br />
        <strong>Client Id</strong>: ${
          formData.get("client_id")?.toString() || "-"
        }
        <br />
        <strong>Listing Id</strong>: ${
          formData.get("listing_id")?.toString() || "-"
        }
        <br />
    </div>
  `;
}

export function removeDuplicates(array: Array<{ id: string; value: string }>) {
  const uniqueItems = [];
  const seenIds = new Set();

  for (const item of array) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export function isMobile(userAgent: string) {
  return /Mobile|Android|iP(hone|od|ad)/i.test(userAgent);
}

export function generateImageMetaLinks(items: Array<string>) {
  return items.map((image) => {
    return {
      rel: "preload",
      href: image,
      as: "image",
    };
  });
}

export function generateSlug(text: string = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// this is a helper function to sort areas by price, remove this function when sorting by price is fixed
export function sortAreasByPrice(areas: any[], sortType: string) {
  if (!sortType) return areas;

  return areas.sort((a, b) => {
    const priceA = a.property.price as number;
    const priceB = b.property.price as number;

    if (sortType === SortPrice.Highest) {
      return priceB - priceA;
    } else if (sortType === SortPrice.Lowest) {
      return priceA - priceB;
    }

    return 0;
  });
}

export function getSortOrder(sort?: string) {
  switch (sort) {
    case SortPrice.Highest:
      return ["Price:desc"];
    case SortPrice.Lowest:
      return ["Price:asc"];
    default:
      return ["createdAt:desc"];
  }
}

export function getOffPlanSortOrder(sort?: string) {
  switch (sort) {
    case SortPrice.Highest:
      return ["Starting_price:desc"];
    case SortPrice.Lowest:
      return ["Starting_price:asc"];
    default:
      return ["createdAt:desc"];
  }
}

export function getProjectSortOrder(sort?: string) {
  switch (sort) {
    case "newest":
      return ["createdAt:desc"];
    case "oldest":
      return ["createdAt:asc"];
    case "price-asc":
      return ["Price:asc"];
    case "price-desc":
      return ["Price:desc"];
    default:
      return ["createdAt:desc"];
  }
}

export function formatKebabCase(text: string) {
  return text
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Extrae los componentes de un string como "+4.5 M SQFT", "#5", "X2", "90%" en:
 * { prefix: '#', number: '5', unit: '' } o { sign: '+', number: '4.5', unit: 'M SQFT' }
 * El signo, prefijo y unidad son opcionales según el texto recibido.
 *
 * Soporta:
 * - Signos matemáticos: +100, -50
 * - Prefijos especiales: #5, X2
 * - Decimales: 4.5, 141.9
 * - Separadores de miles: 1,059
 * - Unidades: %, M, B, SQFT, Mos., etc.
 */
export function extractNumbersFromText(text: string): {
  sign?: string;
  prefix?: string;
  number: string;
  unit?: string;
} {
  // Primero intentamos con el patrón estándar: [signo][número][unidades]
  const standardRegex = /^\s*([+-])\s*([\d.,]+)\s*(.*)$/;
  const standardMatch = text.match(standardRegex);

  if (standardMatch) {
    const [, sign, number, unitRaw] = standardMatch;
    const unit = unitRaw.trim() || undefined;
    return {
      sign,
      number: number.trim(),
      ...(unit ? { unit } : {}),
    };
  }

  // Si no hay signo, intentamos con prefijo: [prefijo][número][unidades]
  // Captura cualquier caracter no-numérico antes del número (como #, X, etc.)
  const prefixRegex = /^\s*([^\d\s.,+-]*)\s*([\d.,]+)\s*(.*)$/;
  const prefixMatch = text.match(prefixRegex);

  if (prefixMatch) {
    const [, prefixRaw, number, unitRaw] = prefixMatch;
    const prefix = prefixRaw.trim() || undefined;
    const unit = unitRaw.trim() || undefined;

    return {
      ...(prefix ? { prefix } : {}),
      number: number.trim(),
      ...(unit ? { unit } : {}),
    };
  }

  // Si nada funciona, retornar vacío
  return { number: "" };
}

/**
 * Aplica extractNumbersFromText a las propiedades "title"
 * de todos los objetos de un arreglo.
 */
export function extractNumbersFromArrayTitles<T extends { title: string }>(
  arr: T[]
): Array<{ sign?: string; prefix?: string; number: string; unit?: string }> {
  return arr.map((item) => extractNumbersFromText(item.title));
}

export function formatArrayToString(array: unknown): string {
  if (!Array.isArray(array) || array.length === 0) return "";
  // Si todos son strings, únelo. Si no, mapea a string por seguridad.
  return array
    .map((el) => (typeof el === "string" ? el : String(el)))
    .join(", ");
}

export function formatProjectType(
  projectType: string | string[] | undefined | null
): string {
  // Si es undefined o null
  if (!projectType) return "";

  // Si es un array
  if (Array.isArray(projectType)) {
    // Si tiene un solo elemento, retornar ese elemento
    if (projectType.length === 1) return projectType[0];
    // Si tiene múltiples elementos, formatear con join
    return projectType.join(", ");
  }

  // Si es un string, retornarlo directamente
  return projectType;
}

// Helper function to extract the video ID from a YouTube URL
export function extractVideoId(url: string) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
  return match ? match[1] : "";
}

export const getYoutubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^&\n?\#]+)/);
  return match?.[1] || '';
};

export function getBudgetFromLoanAmount(loanAmount: number): string {
  if (loanAmount < 1000000) {
    return "Bellow AED 1.000.000";
  } else if (loanAmount >= 1000000 && loanAmount < 2000000) {
    return "AED 1.000.000 - 2.000.000";
  } else if (loanAmount >= 2000000 && loanAmount < 5000000) {
    return "AED 2.000.000 - 5.000.000";
  } else if (loanAmount >= 5000000 && loanAmount < 10000000) {
    return "AED 5.000.000 - 10.000.000";
  } else {
    return "Above AED 10.000.000";
  }
}