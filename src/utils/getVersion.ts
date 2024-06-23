export default function getVersion() {
  const commitHash =
    // vercel enviroment
    process.env.VERCEL_GIT_COMMIT_SHA ??
    // coolify enviroment
    process.env.SOURCE_COMMIT;

  return (commitHash ?? 'dev').slice(0, 9);
}
