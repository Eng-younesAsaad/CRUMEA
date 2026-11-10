export const API_BASE_URL = "https://shopboard-api.vercel.app";

export type ApiDiagnosticMode = "normal" | "delay" | "fail" | "empty";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly statusText: string;
  readonly details: unknown;

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.details = details;
  }
}

export interface FetchOptions extends RequestInit {
  modeOverride?: ApiDiagnosticMode;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export function resolveEndpointUrl(
  path: string,
  mode: ApiDiagnosticMode = "normal"
): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  switch (mode) {
    case "delay":
      return `${API_BASE_URL}/delay/3000${cleanPath}`;
    case "fail":
      return `${API_BASE_URL}/fail/500${cleanPath}`;
    case "empty":
      return `${API_BASE_URL}/empty${cleanPath}`;
    case "normal":
    default:
      return `${API_BASE_URL}${cleanPath}`;
  }
}

export function detectModeFromSearchParams(
  params?: Record<string, string | string[] | undefined>
): ApiDiagnosticMode {
  if (!params) {
    return "normal";
  }

  const modeVal =
    typeof params["mode"] === "string" ? params["mode"] : undefined;
  if (modeVal === "delay" || modeVal === "fail" || modeVal === "empty") {
    return modeVal;
  }

  if (params["delay"] !== undefined) {
    return "delay";
  }
  if (params["fail"] !== undefined) {
    return "fail";
  }
  if (params["empty"] !== undefined) {
    return "empty";
  }

  return "normal";
}

export async function fetchJson<T>(
  url: string,
  validator: (data: unknown) => data is T,
  options?: FetchOptions
): Promise<T> {
  const mode = options?.modeOverride ?? "normal";
  const finalUrl = url.startsWith("http") ? url : resolveEndpointUrl(url, mode);

  const fetchInit: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  };

  if (mode === "normal" && !options?.cache) {
    fetchInit.next = options?.next ?? { revalidate: 60 };
  } else {
    fetchInit.cache = options?.cache ?? "no-store";
  }

  const response = await fetch(finalUrl, fetchInit);

  if (!response.ok) {
    let errorDetails: unknown = null;
    try {
      errorDetails = await response.json();
    } catch {
      try {
        errorDetails = await response.text();
      } catch {
        errorDetails = "Failed to parse error response";
      }
    }
    throw new ApiError(
      `API Request Failed [${response.status} ${response.statusText}]`,
      response.status,
      response.statusText,
      errorDetails
    );
  }

  const rawData: unknown = await response.json();
  if (!validator(rawData)) {
    throw new ApiError(
      "API response failed runtime validation predicate",
      response.status,
      response.statusText,
      rawData
    );
  }

  return rawData;
}
