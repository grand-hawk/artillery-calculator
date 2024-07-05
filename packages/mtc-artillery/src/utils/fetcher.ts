export default async function fetcher(...args: Parameters<typeof fetch>) {
  return fetch(...args).then((res) => res.json());
}
