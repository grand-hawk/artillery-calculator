export default function objectKeySearch(
  object: Record<string | number | symbol, unknown>,
  fullKey: string,
): unknown {
  let message: unknown = object;

  for (const part of fullKey.split('.')) {
    const next = (message as typeof object)[part];
    if (!part || !next) return fullKey;
    message = next;
  }

  return message;
}
