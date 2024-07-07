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
  recommended: boolean;
}

export interface PlatformReleases {
  arm: Record<string, Release>;
  x64: Record<string, Release>;
}

export type Releases = Record<'win' | 'linux' | 'macos', PlatformReleases>;

export const ReleaseTemplate: Releases = {
  win: { arm: {}, x64: {} },
  linux: { arm: {}, x64: {} },
  macos: { arm: {}, x64: {} },
};

export default async function getReleases(): Promise<Releases> {
  const {
    NEXT_PUBLIC_REPO_OWNER: REPO_OWNER,
    NEXT_PUBLIC_REPO_NAME: REPO_NAME,
  } = process.env;
  if (!REPO_OWNER || !REPO_NAME) return ReleaseTemplate;

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
      recommended: false,
    };

    // windows
    if (name.endsWith('x64-setup.exe'))
      releases.win.x64[asset.node_id] = Object.assign(
        {
          recommended: true,
        } as Partial<Release>,
        release,
      );
    else if (name.endsWith('x64_en-us.msi'))
      releases.win.x64[asset.node_id] = release;
    // linux
    else if (name.endsWith('amd64.appimage'))
      releases.linux.x64[asset.node_id] = release;
    else if (name.endsWith('amd64.deb'))
      releases.linux.x64[asset.node_id] = Object.assign(
        {
          recommended: true,
        } as Partial<Release>,
        release,
      );
    else if (name.endsWith('x86_64.rpm'))
      releases.linux.x64[asset.node_id] = release;
    // macos
    else if (name.endsWith('aarch64.dmg'))
      releases.macos.arm[asset.node_id] = release;
    else if (name.endsWith('x64.dmg'))
      releases.macos.x64[asset.node_id] = release;
  }

  return releases;
}
