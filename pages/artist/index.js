import React from 'react'
import Head from 'components/head';
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image"

import index from 'styles/index.module.scss'

import Header from 'components/top-header';
import Footer from 'components/footer';

const Index = ({ artistData, title, description }) => {

  const artistRealData = artistData.map((artist) => matter(artist));
  const artistListItems = artistRealData.map((artistListItem) => artistListItem.data);

  return (
    <>

      <Header />
      <main className={index.main}>
        <h2 className={index.h2}>
          Artists<small>　アーティスト</small>
        </h2>
        <ul>
          {artistListItems.map((artist, i) => (
            <li key={i}>
              <Link href={`/artist/${artist.slug}`}>
                <a>
                  <h5>{artist.title}</h5>
                  <p>{artist.description}</p>
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
      artistData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
