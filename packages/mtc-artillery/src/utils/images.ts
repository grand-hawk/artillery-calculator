const IMAGES_BASE = 'https://img.astrid.ovh/artillery-calculator';

export function getMapImageUrl(
  imageName: string,
  options?: { width?: number; q?: number },
): string {
  const params = new URLSearchParams();
  if (options?.q !== undefined) params.set('q', String(options.q));
  if (options?.width !== undefined) params.set('w', String(options.width));
  const query = params.toString();
  return `${IMAGES_BASE}/maps/${imageName}.png${query ? `?${query}` : ''}`;
}

export function getHeightmapImageUrl(imageName: string): string {
  return `${IMAGES_BASE}/heightmaps/${imageName}.png`;
}
