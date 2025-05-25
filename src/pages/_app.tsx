import Head from 'next/head';
import type { AppProps } from 'next/app';
import MetaPixel from '@/components/MetaPixel';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Villa Sawarna - Penginapan Terbaik di Pantai Sawarna</title>
        <meta name="description" content="Temukan villa terbaik di Pantai Sawarna dengan pemandangan laut yang menakjubkan. Berbagai pilihan villa dengan fasilitas lengkap untuk liburan Anda." />
        <meta name="keywords" content="villa sawarna, penginapan sawarna, hotel sawarna, pantai sawarna, wisata sawarna" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Villa Sawarna - Penginapan Terbaik di Pantai Sawarna" />
        <meta property="og:description" content="Temukan villa terbaik di Pantai Sawarna dengan pemandangan laut yang menakjubkan. Berbagai pilihan villa dengan fasilitas lengkap untuk liburan Anda." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://villasawarna.com" />
        <meta property="og:image" content="https://villasawarna.com/og-image.jpg" />
        <link rel="canonical" href="https://villasawarna.com" />
      </Head>
      <MetaPixel />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 