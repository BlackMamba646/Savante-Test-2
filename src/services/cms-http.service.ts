import { ENVIRONMENT } from "@/config/env.config";
import { QueryConvert } from "@/utils/utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.concat("/api") ?? "";
const TOKEN = process.env.NEXT_CMS_SECRET_TOKEN ?? "";

export class CMSRequestService {
  public async find<T>(
    path = "",
    queryData?: object,
    options: RequestInit = {}
  ): Promise<{ response: T }> {
    const query = queryData ? QueryConvert.toString(queryData) : "";
    const url = `${BASE_URL}${path}${query}`;

    const config: RequestInit = {
      cache: options.cache ?? "force-cache",
      next: options.next ?? { revalidate: ENVIRONMENT.CACHE_REVALIDATE },
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...(options.headers || {}),
      },
    };

    try {
      const res = await fetch(url, config);
      const raw = await res.text();
      const payload = raw
        ? (() => {
            try {
              return JSON.parse(raw);
            } catch {
              return raw;
            }
          })()
        : null;

      if (!res.ok) {
        const message =
          (payload as any)?.error?.message ||
          (payload as any)?.message ||
          res.statusText;
        throw new Error(message);
      }

      return { response: payload as T };
    } catch (err) {
      console.error("[CMSRequestService.find] request failed:", err);
      throw err;
    }
  }

  public async create<T>(
    path = "",
    data: object,
    options: RequestInit = {}
  ): Promise<{ response: T }> {
    const url = `${BASE_URL}${path}`;

    const config: RequestInit = {
      method: "POST",
      cache: options.cache ?? "no-store",
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await fetch(url, config);
      const raw = await res.text();
      const payload = raw
        ? (() => {
            try {
              return JSON.parse(raw);
            } catch {
              return raw;
            }
          })()
        : null;

      if (!res.ok) {
        const message =
          (payload as any)?.error?.message ||
          (payload as any)?.message ||
          res.statusText;
        console.error(
          `[CMSRequestService.create] Error: ${res.status} ${res.statusText} - ${path}`,
          {
            path,
            status: res.status,
            message,
            url,
            payload,
          }
        );
        throw new Error(message);
      }

      return { response: payload as T };
    } catch (err) {
      console.error("[CMSRequestService.create] request failed:", err);
      throw err;
    }
  }
}
