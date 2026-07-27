import { getProperties, getBuilders } from "@lib/api-server.js";
import { SITE_URL } from "@lib/constants.js";

export default async function sitemap() {
  const staticRoutes = ["", "/properties", "/builders", "/about", "/contact", "/services"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
    })
  );

  const [{ data: properties }, { data: builders }] = await Promise.all([
    getProperties({ limit: 100 }),
    getBuilders({ limit: 100 }),
  ]);

  const propertyRoutes = (properties || []).map((property) => ({
    url: `${SITE_URL}/properties/${property.slug}`,
    lastModified: property.updatedAt,
  }));

  const builderRoutes = (builders || []).map((builder) => ({
    url: `${SITE_URL}/builders/${builder.slug}`,
    lastModified: builder.updatedAt,
  }));

  return [...staticRoutes, ...propertyRoutes, ...builderRoutes];
}
