export default function getVersion() {
  const commitHash =
    process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.SOURCE_COMMIT;
  return (commitHash ?? 'dev').slice(0, 9);
}
