import Head from 'next/head';

const Named = ({ title, description, image, url }) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="robots" content="follow, index" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />

      <title>{title}</title>
      <meta property="og:title" content={title} />

      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta property="og:site_name" content="サイト名が入ります。" />

      <meta property="fb:app_id" content="App-IDがここに入ります。" />
      <meta property="fb:admins" content="adminIDがここに入ります。" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:site"
        content="Twitterカードのフッターで使用されるウェブサイトの@ユーザー名"
      />
      <meta
        name="twitter:creator"
        content="コンテンツ作成者/著者の@ユーザー名"
      />
    </Head>
  );
};

export default Named;