import ky from 'ky';

export default async function getMotd() {
  let motd: string | null = null;

  if (process.env.STRAPI_URL && process.env.STRAPI_TYPE) {
    try {
      const response = await ky
        .get(`${process.env.STRAPI_URL!}${process.env.STRAPI_TYPE!}`)
        .json<{
          data: { text: string } & Record<string, unknown>;
        }>();

      if (response.data.text) motd = response.data.text as string;
    } catch (_) {
      // Don't handle error
    }
  }

  return motd;
}
