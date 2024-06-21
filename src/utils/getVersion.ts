export default function getVersion() {
  return (process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev').slice(0, 9);
}
