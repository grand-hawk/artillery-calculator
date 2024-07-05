import { getEntry } from 'strapi-rest';

export default async function getMotd() {
  let motd: string | null = null;

  if (process.env.STRAPI_URL && process.env.STRAPI_TYPE) {
    try {
      const entry = await getEntry({
        apiUrl: process.env.STRAPI_URL!,
        id: process.env.STRAPI_TYPE!,
      });

      if (entry.attributes.text) motd = entry.attributes.text as string;
    } catch (_) {
      // Don't handle error
    }
  }

  return motd;
}
