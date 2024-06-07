import Script from 'next/script';

export default function Umami() {
  return (
    process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN && (
      <Script
        defer
        src={new URL(
          '/script.js',
          process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN,
        ).toString()}
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
        data-host-url={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
      />
    )
  );
}
