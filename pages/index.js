import React from 'react'
import Head from 'components/head';
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image"

import index from 'styles/index.module.scss'
import top from 'styles/top.module.scss'

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

const Index = ({ newsData, artistData,columnData, interviewData, playlistData, title, description }) => {

  const newsRealData = newsData.map((news) => matter(news));
  const newsListItems = newsRealData.map((newsListItem) => newsListItem.data);

  const artistRealData = artistData.map((artist) => matter(artist));
  const artistListItems = artistRealData.map((artistListItem) => artistListItem.data);

  const columnListItems = columnData.map((column) => matter(column)).map((columnListItem) => columnListItem.data);

  const interviewListItems = interviewData.map((interview) => matter(interview)).map((interviewListItem) => interviewListItem.data);

  const playlistListItems = playlistData.map((playlist) => matter(playlist)).map((playlistListItem) => playlistListItem.data);

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
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className={index.h2}>
          Playlist​<small>　プレイリスト</small>
        </h2>
        ​ <p>FTZ recordsリリースの楽曲を紹介！</p>
        <h2 className={index.h2}>
          Artists<small>　アーティスト</small>
        </h2>
        <ul>
          {artistListItems.map((artist, i) => (
            <li key={i} className={index.artist_list}>
              <Link href={`/artist/${artist.slug}`}>
                <a>
                  <div className={index.artist_img}>
                    <Image src={artist.tmb} alt={artist.title+"のサムネイル"} height="160" width="160" objectFit={"cover"} decoding="async" loading="lazy" />
                  </div>
                  <h5 className={index.artist_title}><span>{artist.title}</span></h5>
                  {/* <p>{artist.description}</p> */}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className={index.h2}>
          <Link href={`/zine`}>
            <a>ZINE<small>　ジン</small></a>
          </Link>
        </h2>

        <div className={top.zine_list}>
          <h3 className={top.h3}>INTERVIEW</h3>
          <ul className={index.list}>
            {interviewListItems.map((interview, i) => (
              <li key={i} className={index.list_post}>
                <Link href={`/zine/interview/${interview.slug}`}>
                  <a>
                    <div className={index.list_img}>
                      <Image src={interview.tmb} alt={interview.title+"のサムネイル"} height="160" width="300" objectFit={"cover"} decoding="async" loading="lazy" />
                    </div>
                    <h5 className={index.list_title}><span>{interview.title}</span></h5>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={top.zine_list}>
          <h3 className={top.h3}>COLUMN</h3>
          <ul className={index.list}>
            {columnListItems.map((column, i) => (
              <li key={i} className={index.list_post}>
                <Link href={`/zine/column/${column.slug}`}>
                  <a>
                    <div className={index.list_img}>
                      <Image src={column.tmb} alt={column.title+"のサムネイル"} height="160" width="300" objectFit={"cover"} decoding="async" loading="lazy" />
                    </div>
                    <h5 className={index.list_title}><span>{column.title}</span></h5>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={top.zine_list}>
          <h3 className={top.h3}>PLAYLIST</h3>
          <ul className={index.list}>
            {playlistListItems.map((playlist, i) => (
              <li key={i} className={index.list_post}>
                <Link href={`/zine/playlist/${playlist.slug}`}>
                  <a>
                    <div className={index.list_img}>
                      <Image src={playlist.tmb} alt={playlist.title+"のサムネイル"} height="160" width="300" objectFit={"cover"} decoding="async" loading="lazy" />
                    </div>
                    <h5 className={index.list_title}><span>{playlist.title}</span></h5>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
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

  const columns = fs.readdirSync(`content/zine/column`, "utf-8").filter((fn) => fn.endsWith(".md"));
  const columnData = columns.map((column) => {
    const columnRawContent = fs.readFileSync(`content/zine/column/${column}`, { encoding: "utf-8", });
    const columnEditedContent = columnRawContent.slice(0, 3) + "\nslug: " + { column }.column.slice(0, -3) + "\n" + columnRawContent.slice(3);
    return columnEditedContent;
  });

  const interviews = fs.readdirSync(`content/zine/interview`, "utf-8").filter((fn) => fn.endsWith(".md"));
  const interviewData = interviews.map((interview) => {
    const interviewRawContent = fs.readFileSync(`content/zine/interview/${interview}`, { encoding: "utf-8", });
    const interviewEditedContent = interviewRawContent.slice(0, 3) + "\nslug: " + { interview }.interview.slice(0, -3) + "\n" + interviewRawContent.slice(3);
    return interviewEditedContent;
  });

  const playlists = fs.readdirSync(`content/zine/playlist`, "utf-8").filter((fn) => fn.endsWith(".md"));
  const playlistData = playlists.map((playlist) => {
    const playlistRawContent = fs.readFileSync(`content/zine/playlist/${playlist}`, { encoding: "utf-8", });
    const playlistEditedContent = playlistRawContent.slice(0, 3) + "\nslug: " + { playlist }.playlist.slice(0, -3) + "\n" + playlistRawContent.slice(3);
    return playlistEditedContent;
  });

  return {
    props: {
      newsData,artistData,columnData, interviewData, playlistData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
