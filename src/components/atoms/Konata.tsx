import Image from 'next/image';

export default function Konata() {
  return (
    <Image
      alt=""
      height={100}
      src="/assets/konata.webp"
      style={{
        position: 'absolute',
        bottom: 0,
        right: '20%',
      }}
      width={123}
    />
  );
}
