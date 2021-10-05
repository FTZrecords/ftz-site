import React from "react";
import { useEffect } from "react";

import Head from "components/head";
import Header from "components/zine-header";
import Footer from "components/footer";

import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

import index from "styles/index.module.scss";
import slider from "styles/slider.module.scss";

import Siema from "public/siema.min.js";

function getStringFromDate(date) {
  var year_str = date.getFullYear();
  var month_str = 1 + date.getMonth();
  var day_str = date.getDate();
  var hour_str = date.getHours();
  var minute_str = date.getMinutes();
  return year_str + "." + month_str + "." + day_str;
}

const Index = ({
  newsData,
}) => {
  const newsListItems = newsData
    .map((news) => matter(news))
    .map((newsListItem) => newsListItem.data);

  return (
    <>
      <Head
        title="FTZine｜FTZrecords"
        description="FTZine｜FTZrecords"
        image={
          "https://qiita-user-profile-images.imgix.net/https%3A%2F%2Flh3.googleusercontent.com%2F-BUmWankl_aQ%2FAAAAAAAAAAI%2FAAAAAAAADys%2F8oi87glPMLA%2Fphoto.jpg%3Fsz%3D50?ixlib=rb-1.2.2&auto=compress%2Cformat&lossless=0&w=300&s=649d309c71e365e6fc6d6b6d205c3710"
        }
      />

      <Header />

      <main className={`${index.main} ${index.top}`}>
  
        <h2 className={index.h2} id="news">
          News<small>　最新情報</small>
        </h2>
        <p className={index.h2_description}>FTZにまつわる最新情報をチョイス</p>
        <ul className={index.list_index}>
          {newsListItems.map((news, i) => (
            <li key={i} className={index.list_post}>
              <Link href={`/news/${news.slug}`}>
                <a>
                  <div className={index.list_tmb}>
                    <div className={index.list_img}>
                      <Image
                        src={news.tmb}
                        alt={news.title + "のサムネイル"}
                        height="160"
                        width="300"
                        objectFit={"cover"}
                        decoding="async"
                        loading="lazy"
                      />
                    </div>
                    <h5 className={index.list_title}>
                      <span>{news.title}</span>
                    </h5>
                  </div>
                  <p className={index.list_description}>{news.description}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>

      </main>

      <Footer />
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const siteData = await import(`config.json`);
  const fs = require("fs");

  const newss = fs
    .readdirSync(`content/news`, "utf-8")
    .filter((fn) => fn.endsWith(".md"));
  const newsData = newss.map((news) => {
    const newsRawContent = fs.readFileSync(`content/news/${news}`, {
      encoding: "utf-8",
    });
    const newsEditedContent =
      newsRawContent.slice(0, 3) +
      "\nslug: " +
      { news }.news.slice(0, -3) +
      "\n" +
      newsRawContent.slice(3);
    return newsEditedContent;
  });

  return {
    props: {
      newsData,
    },
  };
}
