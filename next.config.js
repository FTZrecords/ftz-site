module.exports = {
  compress: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
  images: {
    domains: ["placehold.jp"],
  },
  async redirects() {
    return [
      {
        source: "/zine/column/音楽と政治-その１", // リダイレクト元のURL
        destination: "/zine/column/music_and_politics_no1", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
      {
        source: "/zine/column/音楽と政治-後編", // リダイレクト元のURL
        destination: "/zine/column/music_and_politics_no2", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
      {
        source: "/zine/column/忌々しきアーティストのアイドル化について", // リダイレクト元のURL
        destination: "/zine/column/idolization_of_artists", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
      {
        source: "/zine/column/新しい音楽の楽しみ方", // リダイレクト元のURL
        destination: "/zine/column/new_music", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
      {
        source: "/zine/playlist/流動的現実", // リダイレクト元のURL
        destination: "/zine/playlist/fluid_reality", // リダイレクト先のURL
        permanent: true, // 永続的なリダイレクトかのフラグ
      },
    ];
  },
};
