import Cache from 'stale-lru-cache';

export interface Asset {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label: string;
  uploader: object;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface Release {
  name: string;
  browser_download_url: string;
}

export interface PlatformReleases {
  arm: Release[];
  x64: Release[];
}

export type Releases = Record<'win' | 'linux' | 'macos', PlatformReleases>;

export const ReleasesMaxAge = 60;

const ReleaseTemplate = {
  win: { arm: [], x64: [] },
  linux: { arm: [], x64: [] },
  macos: { arm: [], x64: [] },
};

export default async function getReleases(): Promise<Releases> {
  const {
    NEXT_PUBLIC_REPO_OWNER: REPO_OWNER,
    NEXT_PUBLIC_REPO_NAME: REPO_NAME,
  } = process.env;
  if (!REPO_OWNER || !REPO_NAME)
    throw new Error('Missing required enviroment variables');

  const response = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`,
  );
  if (!response.ok) return ReleaseTemplate;

  const data = await response.json();
  const assets = data.assets as Asset[];

  const releases: Releases = { ...ReleaseTemplate };

  for (const asset of assets) {
    const name = asset.name.trim().toLowerCase();

    const release: Release = {
      name,
      browser_download_url: asset.browser_download_url,
    };

    // macos
    if (name.endsWith('aarch64.dmg')) releases.macos.arm.push(release);
    else if (name.endsWith('x64.dmg')) releases.macos.x64.push(release);
    // linux
    else if (name.endsWith('amd64.appimage')) releases.linux.x64.push(release);
    else if (name.endsWith('amd64.deb')) releases.linux.x64.push(release);
    // windows
    else if (name.endsWith('x64-setup.exe')) releases.win.x64.push(release);
    else if (name.endsWith('x64_en-us.msi')) releases.win.x64.push(release);
  }

  return releases;
}

export const cache = new Cache({
  maxAge: ReleasesMaxAge,
  revalidate: (_, callback) =>
    getReleases().then((releases) => releases && callback(releases)),
});
