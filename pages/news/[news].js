import React from 'react'
import Link from 'next/link'
import Head from "next/head";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import post from 'styles/post.module.scss'

import Header from 'components/top-header';
import Footer from 'components/footer';

import imageRenderer from 'components/md-img';

const Blog = ({ content, data }) => {
  const frontmatter = data;

  return (
    <>
      <Head>
        <title key="title">{frontmatter.title}｜FTZrecords</title>
        <meta
          key="description"
          name="description"
          content={frontmatter.description}
        ></meta>
      </Head>
      <Header />
      <main className={post.main}>
        <h2>{frontmatter.title}</h2>
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

Blog.getInitialProps = async (context) => {
  const { news } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`content/news/${news}.md`);
  const data = matter(content.default);

  return { ...data };
};

