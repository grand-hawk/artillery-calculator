import slug from 'slug';

const IMAGES_BASE = 'https://maps.artillery-calculator.com';

export function getMapImageUrl(
  key: string,
  options?: { width?: number; q?: number },
): string {
  const params = new URLSearchParams();
  if (options?.q !== undefined) params.set('q', String(options.q));
  if (options?.width !== undefined) params.set('w', String(options.width));
  const query = params.toString();
  return `${IMAGES_BASE}/${slug(key)}/user.png${query ? `?${query}` : ''}`;
}

export function getHeightmapImageUrl(key: string): string {
  return `${IMAGES_BASE}/${slug(key)}/heightmap.png`;
}
