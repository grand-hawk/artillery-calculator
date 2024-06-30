import { useRouter } from 'next/router';

export default function useProperLocale() {
  let { locale } = useRouter();

  if (locale === 'lolcat-US') locale = 'en-US';

  return locale;
}
