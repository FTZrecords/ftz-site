import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import matter from "gray-matter";

import Markdown from "react-markdown";
import grayMatter from "gray-matter";
import remarkGfm from "remark-gfm";
import unwrapImages from "remark-unwrap-images";
//HTMLを
import rehypeRaw from "rehype-raw";
//タイトルタグにジャンプリンクを
import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
//ショートコード
import directive from "remark-directive";

import post from "styles/post.module.scss";

import Header from "components/top-header";
import Footer from "components/footer";

import imageRenderer from "components/md-img";

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
        <Markdown
            children={content}
            remarkPlugins={[
              remarkGfm,
              unwrapImages,
              remarkSlug,
              [remarkAutolinkHeadings, { behavior: "wrap" }],
              directive,
            ]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: (e) => {
                return (
                  <div
                    style={{ position: "relative", width: "100%", height: 230 }}
                  >
                    <Image
                      src={e.src}
                      alt={e.alt}
                      decoding={"async"}
                      loading={"lazy"}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                );
              },
              link: (e) => {
                if (e.href.match("http")) {
                  return (
                    <a href={e.href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                }
                if (e.href.slice(0, 1) == "#") {
                  return <a href={e.href}>{e.children}</a>;
                }
                return (
                  <Link href={e.href}>
                    <a>{e.child}</a>
                  </Link>
                );
              },
            }} //rendererからcomponentsに変わった
          />
      </main>
      <Footer />
    </>
  );
};

export default Blog;

Blog.getInitialProps = async (context) => {
  const { member } = context.query;
  // Import our .md file using the `slug` from the URL
  const content = await import(`content/member/${member}.md`);
  const data = matter(content.default);

  return { ...data };
};
