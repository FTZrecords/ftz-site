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
  sliderData,
  columnData,
  interviewData,
  playlistData,
  newsData,
  artistData,
}) => {
  const sliderListItems = sliderData
    .map((slider) => matter(slider))
    .map((sliderListItem) => sliderListItem.data);
  const newsListItems = newsData
    .map((news) => matter(news))
    .map((newsListItem) => newsListItem.data);
  const columnListItems = columnData
    .map((column) => matter(column))
    .map((columnListItem) => columnListItem.data);
  const interviewListItems = interviewData
    .map((interview) => matter(interview))
    .map((interviewListItem) => interviewListItem.data);
  const playlistListItems = playlistData
    .map((playlist) => matter(playlist))
    .map((playlistListItem) => playlistListItem.data);
  const artistListItems = artistData
    .map((artist) => matter(artist))
    .map((artistListItem) => artistListItem.data);

  useEffect(() => {
    const mySiema = new Siema({
      loop: true,
    });
    setInterval(() => mySiema.next(), 3000);
  }, []);

  return (
    <>
      <Head
        title="FTZine｜FTZrecordsによる"
        description="FTZine｜FTZrecordsによる"
        image={
          "https://qiita-user-profile-images.imgix.net/https%3A%2F%2Flh3.googleusercontent.com%2F-BUmWankl_aQ%2FAAAAAAAAAAI%2FAAAAAAAADys%2F8oi87glPMLA%2Fphoto.jpg%3Fsz%3D50?ixlib=rb-1.2.2&auto=compress%2Cformat&lossless=0&w=300&s=649d309c71e365e6fc6d6b6d205c3710"
        }
      />

      <Header />

      <main className={index.main}>
        <ul className={`${slider.slider} siema`}>
          {sliderListItems.map((e, i) => (
            <li key={i}>
              <Link href={e.slug}>
                <a>
                  <div className={slider.tmbImg}>
                    <Image
                      src={e.tmb}
                      alt={e.title + "のサムネイル"}
                      height="500"
                      width="1500"
                      objectFit={"cover"}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <div className={slider.coverData}>
                    <h5>
                      <span>{e.title}</span>
                    </h5>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
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
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className={index.h2}>
          Interview<small>　インタビュー</small>
        </h2>
        <ul className={index.list}>
          {interviewListItems.map((interview, i) => (
            <li key={i} className={index.list_post}>
              <Link href={`/zine/interview/${interview.slug}`}>
                <a>
                  <div className={index.list_img}>
                    <Image
                      src={interview.tmb}
                      alt={interview.title + "のサムネイル"}
                      height="160"
                      width="300"
                      objectFit={"cover"}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <h5 className={index.list_title}>
                    <span>{interview.title}</span>
                  </h5>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className={index.h2}>
          Column<small>　コラム</small>
        </h2>
        <ul className={index.list}>
          {columnListItems.map((column, i) => (
            <li key={i} className={index.list_post}>
              <Link href={`/zine/column/${column.slug}`}>
                <a>
                  <div className={index.list_img}>
                    <Image
                      src={column.tmb}
                      alt={column.title + "のサムネイル"}
                      height="160"
                      width="300"
                      objectFit={"cover"}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <h5 className={index.list_title}>
                    <span>{column.title}</span>
                  </h5>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className={index.h2}>
          Playlist<small>　プレイリスト</small>
        </h2>
        <ul className={index.list}>
          {playlistListItems.map((playlist, i) => (
            <li key={i} className={index.list_post}>
              <Link href={`/zine/playlist/${playlist.slug}`}>
                <a>
                  <div className={index.list_img}>
                    <Image
                      src={playlist.tmb}
                      alt={playlist.title + "のサムネイル"}
                      height="160"
                      width="300"
                      objectFit={"cover"}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <h5 className={index.list_title}>
                    <span>{playlist.title}</span>
                  </h5>
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <h2 className={index.h2}>
          Artists<small>　アーティスト</small>
        </h2>
        <ul>
          {artistListItems.map((artist, i) => (
            <li key={i} className={index.artist_list}>
              <Link href={`/artist/${artist.slug}`}>
                <a>
                  <div className={index.artist_img}>
                    <Image
                      src={artist.tmb}
                      alt={artist.title + "のサムネイル"}
                      height="160"
                      width="160"
                      objectFit={"cover"}
                      decoding="async"
                      loading="lazy"
                    />
                  </div>
                  <h5 className={index.artist_title}>
                    <span>{artist.title}</span>
                  </h5>
                  {/* <p>{artist.description}</p> */}
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

  const sliderList = [
    "zine/interview/kinail-x-som-ssw-my-wave.md",
    "zine/column/chooning.md",
    "zine/playlist/chooning.md",
  ];
  const sliderData = sliderList.map((slider) => {
    const sliderRawContent = fs.readFileSync(`content/${slider}`, {
      encoding: "utf-8",
    });
    const sliderEditedContent =
      sliderRawContent.slice(0, 3) +
      "\nslug: " +
      { slider }.slider.slice(0, -3) +
      "\n" +
      sliderRawContent.slice(3);
    return sliderEditedContent;
  });

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

  const columns = fs
    .readdirSync(`content/zine/column`, "utf-8")
    .filter((fn) => fn.endsWith(".md"));
  const columnData = columns.map((column) => {
    const columnRawContent = fs.readFileSync(`content/zine/column/${column}`, {
      encoding: "utf-8",
    });
    const columnEditedContent =
      columnRawContent.slice(0, 3) +
      "\nslug: " +
      { column }.column.slice(0, -3) +
      "\n" +
      columnRawContent.slice(3);
    return columnEditedContent;
  });

  const interviews = fs
    .readdirSync(`content/zine/interview`, "utf-8")
    .filter((fn) => fn.endsWith(".md"));
  const interviewData = interviews.map((interview) => {
    const interviewRawContent = fs.readFileSync(
      `content/zine/interview/${interview}`,
      { encoding: "utf-8" }
    );
    const interviewEditedContent =
      interviewRawContent.slice(0, 3) +
      "\nslug: " +
      { interview }.interview.slice(0, -3) +
      "\n" +
      interviewRawContent.slice(3);
    return interviewEditedContent;
  });

  const playlists = fs
    .readdirSync(`content/zine/playlist`, "utf-8")
    .filter((fn) => fn.endsWith(".md"));
  const playlistData = playlists.map((playlist) => {
    const playlistRawContent = fs.readFileSync(
      `content/zine/playlist/${playlist}`,
      { encoding: "utf-8" }
    );
    const playlistEditedContent =
      playlistRawContent.slice(0, 3) +
      "\nslug: " +
      { playlist }.playlist.slice(0, -3) +
      "\n" +
      playlistRawContent.slice(3);
    return playlistEditedContent;
  });

  const artists = fs
    .readdirSync(`content/artist`, "utf-8")
    .filter((fn) => fn.endsWith(".md"));
  const artistData = artists.map((artist) => {
    const artistRawContent = fs.readFileSync(`content/artist/${artist}`, {
      encoding: "utf-8",
    });
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
      columnData,
      interviewData,
      playlistData,
      newsData,
      artistData,
      sliderData,
    },
  };
}
