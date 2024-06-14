import ky from 'ky';

export default async function getRemoteVersion(): Promise<string | null> {
  try {
    const response = await ky.get('/api/version', { throwHttpErrors: false });

    if (!response.ok) return null;

    const data = (await response.json()) as { version: string };

    return data.version;
  } catch (error) {
    console.warn(error);

    return null;
  }
}
