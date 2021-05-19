import React from 'react'
import Head from 'components/head';
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image"

import index from 'styles/index.module.scss'
import zine from 'styles/zine.module.scss'

import Header from 'components/top-header';
import Footer from 'components/footer';

function getStringFromDate(date) {
	var year_str = date.getFullYear();
	var month_str = 1 + date.getMonth();
	var day_str = date.getDate();
	var hour_str = date.getHours();
	var minute_str = date.getMinutes();
	return year_str+"."+month_str+"."+day_str;
}

const Index = ({ newsData, artistData, title, description }) => {

  const newsRealData = newsData.map((news) => matter(news));
  const newsListItems = newsRealData.map((newsListItem) => newsListItem.data);

  const artistRealData = artistData.map((artist) => matter(artist));
  const artistListItems = artistRealData.map((artistListItem) => artistListItem.data);

  return (
    <>

      <Header />
      <main className={index.main}>
        <h2 className={index.h2}>
          News<small>　最新情報</small>
        </h2>
        <ul>
          {newsListItems.map((news, i) => (
            <li key={i}>
              <Link href={`/news/${news.slug}`} passHref>
                <a>
                  <h5>{news.title}</h5>
                  <time>{getStringFromDate(news.date)}</time>
                  <p>{news.description}</p>
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

  const newsFiles = fs.readdirSync(`content/news`, "utf-8");
  const newss = newsFiles.filter((fn) => fn.endsWith(".md"));
  const newsData = newss.map((news) => {
    const newsPath = `content/news/${news}`;
    const newsRawContent = fs.readFileSync(newsPath, { encoding: "utf-8", });
    const newsEditedContent = newsRawContent.slice(0, 3) + "\nslug: " + { news }.news.slice(0, -3) + "\n" + newsRawContent.slice(3);
    return newsEditedContent;
  });

  const artistFiles = fs.readdirSync(`content/artist`, "utf-8");
  const artists = artistFiles.filter((fn) => fn.endsWith(".md"));
  const artistData = artists.map((artist) => {
    const artistPath = `content/artist/${artist}`;
    const artistRawContent = fs.readFileSync(artistPath, { encoding: "utf-8", });
    const artistEditedContent = artistRawContent.slice(0, 3) + "\nslug: " + { artist }.artist.slice(0, -3) + "\n" + artistRawContent.slice(3);
    return artistEditedContent;
  });

  return {
    props: {
      newsData,artistData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
