import React from 'react'
import Link from 'next/link'
import Image from "next/image"
import Head from "next/head";

import post from 'styles/post.module.scss'

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import imageRenderer from 'components/md-img';

import Header from 'components/zine-header';
import Footer from 'components/footer';
// import List from 'components/list';

const Blog = ({ content, data }) => {
  const frontmatter = data;

  var d = new Date(frontmatter.date);

  return (
    <>
      <Head>
        <title key="title">{frontmatter.title}｜FTZine</title>
        <meta
          key="description"
          name="description"
          content={frontmatter.description}
        ></meta>
      </Head>

      <Header />

      <main className={post.main}>
        <div className={post.header}>
          <div className={post.tmb}>
            <Image className={post.tmb} src={frontmatter.tmb} alt={frontmatter.title+"のサムネイル"} height={900*9/16} width="900" objectFit={"cover"} decoding="async" loading="lazy" />
          </div>
          <h1 className={post.h1}><Link href="/" passHref>{frontmatter.title}</Link></h1>
        </div>

        <div className={post.meta}>
          <time className={post.meta_date}>{d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate()}</time>
          <div className={post.meta_author_wrap}>
          <Image className={post.meta_author_img} src={"/zine/author/"+frontmatter.author+".jpg"} alt={frontmatter.author+"のアイコン"} height="60" width="60" objectFit={"cover"} decoding="async" loading="lazy" />
          </div>
          <span className={post.meta_author} rel="me">{frontmatter.author}</span>
        </div>

        <article>
          <ReactMarkdown
            renderers={{ image: imageRenderer }}
            children={content}
          />
        </article>

        {/* <List /> */}
      </main>

      <Footer />
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { playlist } = context.query;
  // console.log(playlist);
  // Import our .md file using the `slug` from the URL
  const content = await import(`content/zine/playlist/${playlist}.md`);
  const data = matter(content.default);

  return { ...data };
};


