import Script from 'next/script';

export default function Umami() {
  const domain = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

  return (
    domain && (
      <Script
        data-host-url={domain}
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
        defer
        src={new URL('/script.js', domain).toString()}
      />
    )
  );
}
