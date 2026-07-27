const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1";

/**
 * Fetch helper for Server Components. Runs on the server at request time
 * (or build time for statically generated pages), so the returned data
 * is baked into the HTML the browser/crawler receives — this is the
 * entire point of the Next.js migration: search engines see real
 * property titles, prices, and descriptions, not an empty React root.
 *
 * `revalidate` controls Next.js's data cache: how many seconds before
 * this data is considered stale and re-fetched on the next request.
 */
async function apiFetch(path, { params, revalidate = 60 } = {}) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  const res = await fetch(url.toString(), { next: { revalidate } });

  if (!res.ok) {
    if (res.status === 404) return { data: null, meta: null, notFound: true };
    throw new Error(`API request failed: ${res.status} ${url}`);
  }

  const json = await res.json();
  return { data: json.data, meta: json.meta ?? null, notFound: false };
}

export const getProperties = (params) => apiFetch("/properties", { params, revalidate: 60 });

export const getPropertyBySlug = (slug) =>
  apiFetch(`/properties/slug/${slug}`, { revalidate: 60 });

export const getBuilders = (params) => apiFetch("/builders", { params, revalidate: 300 });

export const getBuilderBySlug = (slug) => apiFetch(`/builders/slug/${slug}`, { revalidate: 300 });

export const getLocations = (params) => apiFetch("/locations", { params, revalidate: 300 });
