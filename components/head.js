import Head from "next/head";

const Named = ({ title, description, image, url }) => {
  if (!url) {
    url = process.env.NEXT_PUBLIC_baseUrl;
  }
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />

      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5576891772662336"
        crossOrigin="anonymous"
      ></script>

      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />

      <link
        rel="prefetch"
        href={
          "https://www.googletagmanager.com/gtag/js?id=" +
          process.env.NEXT_PUBLIC_ga
        }
        as="script"
      />
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ga}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', '${process.env.NEXT_PUBLIC_ga}');
          `,
        }}
      />
    </Head>
  );
};

export default Named;
