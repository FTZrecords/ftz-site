import React from "react";
import Head from "components/head";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

import index from "styles/index.module.scss";

import Header from "components/top-header";
import Footer from "components/footer";

function getStringFromDate(date) {
  var year_str = date.getFullYear();
  var month_str = 1 + date.getMonth();
  var day_str = date.getDate();
  var hour_str = date.getHours();
  var minute_str = date.getMinutes();
  return year_str + "." + month_str + "." + day_str;
}

const Index = ({ newsData, artistData, title, description }) => {
  const newsRealData = newsData.map((news) => matter(news));
  const newsListItems = newsRealData.map((newsListItem) => newsListItem.data);

  const artistRealData = artistData.map((artist) => matter(artist));
  const artistListItems = artistRealData.map(
    (artistListItem) => artistListItem.data
  );

  return (
    <>
      <Header />
      <main className={index.main}>
        FTZ records（エフティーゼットレコーズ） 代表：赤金 諒亮
        設立：2020年2月2日 活動場所：オンライン・東京・福岡
        事業内容　楽曲の管理、CD等の原盤制作、アーティスト・クリエイターの発掘・育成及び管理、音楽ソフト・商品の制作
        ニュース掲載希望で、各種プレスリリース等の送付先 info@ftzrecords.com FTZ
        recordsではジャンル問わずデモを募集しております。
        制作のご依頼、ブッキング、取材、又は、作品に関するご感想等のお問い合わせもこちらで承っております。
        info@ftzrecords.com
        <h2>PRIVACY POLICY</h2>
        <p>
          ​個人情報の取り扱いについて
          本サイトでは、電話、電子メール、ウェブサイトでのお問合せの際に頂く、
          商品・サービス提供のお問合せやお申し込みでの、個人情報（お名前、ご住所、お電話番号、電子メール等）は、次の目的以外での利用は致しません。
          お客様に確実にお問合せ、商品の提供をお届けするため
          ユーザーサポートや弊社からのお知らせをお届けするため
          サービス向上のためのアンケートやダイレクトメールなどお客様へ有用と思われるご案内をお届けするため
          本サイトで提供された情報は、お客様ご本人の同意無く、第三者に対して個人情報を開示することは致しません。
          ただし、法令等により個人情報の開示が要求された場合、当該官公署に限り開示します。
          お客様からご提供頂いた個人情報は、弊社所定の管理基準に基づき厳重に管理し、紛失、破壊、改ざん、漏洩等の防止策を講じます。
          本サイトは、プライバシーポリシーを変更する場合があります。
          プライバシーポリシーに重要な変更がある場合には、サイト上で告知します。
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const siteData = await import(`config.json`);
  const fs = require("fs");

  const newsFiles = fs.readdirSync(`content/news`, "utf-8");
  const newss = newsFiles.filter((fn) => fn.endsWith(".md"));
  const newsData = newss.map((news) => {
    const newsPath = `content/news/${news}`;
    const newsRawContent = fs.readFileSync(newsPath, { encoding: "utf-8" });
    const newsEditedContent =
      newsRawContent.slice(0, 3) +
      "\nslug: " +
      { news }.news.slice(0, -3) +
      "\n" +
      newsRawContent.slice(3);
    return newsEditedContent;
  });

  const artistFiles = fs.readdirSync(`content/artist`, "utf-8");
  const artists = artistFiles.filter((fn) => fn.endsWith(".md"));
  const artistData = artists.map((artist) => {
    const artistPath = `content/artist/${artist}`;
    const artistRawContent = fs.readFileSync(artistPath, { encoding: "utf-8" });
    const artistEditedContent =
      artistRawContent.slice(0, 3) +
      "\nslug: " +
      { artist }.artist.slice(0, -3) +
      "\n" +
      artistRawContent.slice(3);
    return artistEditedContent;
  });

  return {
    props: {
      newsData,
      artistData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
