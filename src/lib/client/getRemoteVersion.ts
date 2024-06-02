import ky from 'ky';

export default async function getRemoteVersion(): Promise<string | null> {
  const response = await ky.get('/api/version');

  if (response.ok) return null;

  const data = (await response.json()) as { version: string };

  return data.version;
}
