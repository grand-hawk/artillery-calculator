import type { Gun, Projectile } from '@/config/guns';

const baseUrl = 'https://data.multicrew.wiki/production/1.0.0';

interface Module {
  type: string;
  data: Record<string, unknown>;
}

interface WeaponModuleData {
  name: string;
  artillery?: boolean;
  ammoSelection?: string[];
}

interface Shell {
  name: string;
  type: string;
  velocity: number;
  ballistics?: { gravity: number; dragConstant?: number; lifetime: number };
  explosive?: { mass: number; radius?: number };
  missile?: unknown;
  cluster?: {
    submunitions: number;
    dispersion?: number;
    deployFactor?: number;
  };
}

interface PlaceData<T> {
  data: Record<string, { data: T }>;
}

type Entities = Record<string, { modules?: Record<string, Module> }>;

async function fetchJson<T>(file: string): Promise<T> {
  const response = await fetch(`${baseUrl}/${file}`);
  if (!response.ok)
    throw new Error(`${file}: ${response.status} ${response.statusText}`);
  return response.json() as Promise<T>;
}

// same keys as the old Luau export, so persisted selections keep working
function normalizeKey(name: string): string {
  const key = Array.from(new TextEncoder().encode(name), (byte) =>
    /[A-Za-z0-9]/.test(String.fromCharCode(byte))
      ? String.fromCharCode(byte)
      : '_',
  ).join('');
  return /^[0-9]/.test(key) ? `_${key}` : key;
}

function isMissile(shell: Shell): boolean {
  return Boolean(shell.missile) || shell.type.includes('MISSILE');
}

function toProjectile(shell: Shell): Projectile {
  const projectile: Projectile = {
    name: shell.name.trim(),
    velocity: shell.velocity,
  };

  if (shell.ballistics) {
    projectile.gravity = shell.ballistics.gravity;
    projectile.lifetime = shell.ballistics.lifetime;
    if (shell.ballistics.dragConstant)
      projectile.dragConstant = shell.ballistics.dragConstant;
  }

  if (shell.explosive) {
    projectile.explosiveMass = Number(shell.explosive.mass.toFixed(4));
    if (shell.explosive.radius)
      projectile.blastRadius = Number(shell.explosive.radius.toFixed(4));
  }

  if (shell.cluster) {
    projectile.submunitions = shell.cluster.submunitions;
    if (shell.cluster.dispersion)
      projectile.submunitionAngularDispersion = shell.cluster.dispersion;
    if (shell.cluster.deployFactor)
      projectile.submunitionDeployFactor = shell.cluster.deployFactor;
  }

  return projectile;
}

function getArtilleryProjectiles(
  modules: Record<string, Module>,
  shells: Record<string, Shell[]>,
): Projectile[] {
  const projectiles: Projectile[] = [];

  for (const weapon of Object.values(modules)) {
    const weaponData = weapon.data as unknown as WeaponModuleData;
    if (weapon.type !== 'Weapon' || !weaponData.artillery) continue;

    const enabledShells = new Set(
      (weaponData.ammoSelection ?? []).flatMap((ref) =>
        Object.entries(modules[ref].data)
          .filter(([, enabled]) => enabled)
          .map(([shellName]) => shellName),
      ),
    );

    for (const shell of shells[weaponData.name] ?? []) {
      if (!enabledShells.has(shell.name) || isMissile(shell)) continue;

      const projectile = toProjectile(shell);
      if (projectiles.some((existing) => existing.name === projectile.name))
        continue;

      projectiles.push(projectile);
    }
  }

  return projectiles.sort(
    (a, b) => a.velocity - b.velocity || a.name.localeCompare(b.name),
  );
}

export default async function fetchGuns(): Promise<Record<string, Gun>> {
  const [config, vehicles, placeables, shells] = await Promise.all([
    fetchJson<{
      data: { placeIds: Record<string, string>; primaryPlace: string };
    }>('config.json'),
    fetchJson<PlaceData<Entities>>('vehicles.json'),
    fetchJson<PlaceData<Entities>>('placeables.json'),
    fetchJson<PlaceData<Record<string, Shell[]>>>('shells.json'),
  ]);

  const placeId = config.data.placeIds[config.data.primaryPlace];
  const placeShells = shells.data[placeId].data;

  const guns: Record<string, Gun> = {};

  for (const [name, entity] of [
    ...Object.entries(vehicles.data[placeId].data),
    ...Object.entries(placeables.data[placeId].data),
  ]) {
    const projectiles = getArtilleryProjectiles(
      entity.modules ?? {},
      placeShells,
    );
    if (projectiles.length === 0) continue;

    const key = normalizeKey(name);
    if (guns[key]) throw new Error(`duplicate gun key ${key} (${name})`);

    guns[key] = { name, projectiles };
  }

  return Object.fromEntries(
    Object.entries(guns).sort(([, a], [, b]) => a.name.localeCompare(b.name)),
  );
}
