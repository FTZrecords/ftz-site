import React from "react";
import fs from "fs";
import { join } from "path";

import Link from "next/link";
import Head from "next/head";
import grayMatter from "gray-matter";
import ReactMarkdown from "react-markdown";

import post from "styles/post.module.scss";

import Header from "components/top-header";
import Footer from "components/footer";

import imageRenderer from "components/md-img";
import { formatDate } from "lib/date";

const categoryName = "news";

const Blog = ({ title, date, description, content }) => {
  return (
    <>
      <Head>
        <title key="title">{title}｜FTZrecords</title>
        <meta key="description" name="description" content={description}></meta>
      </Head>
      <Header />
      <main className={post.main}>
        <h2>{title}</h2>
        <div className={post.newsMeta}>
          <time>{date}</time>
        </div>
        <ReactMarkdown
          renderers={{ image: imageRenderer }}
          children={content}
        />
      </main>
      <Footer />
    </>
  );
};

export default Blog;

export async function getStaticProps(e) {
  const filename = e.params.post;
  const raw = fs.readFileSync(
    join(process.cwd(), "content", categoryName, filename + ".md"),
    "utf8"
  );
  const frontMatter = grayMatter(raw);

  return {
    props: {
      title: frontMatter.data.title,
      date: formatDate(frontMatter.data.date),
      description: frontMatter.data.description,
      content: frontMatter.content,
    },
  };
}

export async function getStaticPaths() {
  let postNameList = fs
    .readdirSync(join(process.cwd(), "content", categoryName), "utf-8")
    .filter((file) => file.endsWith("md"));

  let pathList = postNameList.map((e, i) => {
    return { params: { post: e.slice(0, -3) } };
  });

  return {
    paths: pathList,
    fallback: false,
  };
}
