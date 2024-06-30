import { useRouter } from 'next/router';

export default function useLocale() {
  let { locale } = useRouter();

  if (locale === 'meow-US') locale = 'en-US';

  return locale;
}
