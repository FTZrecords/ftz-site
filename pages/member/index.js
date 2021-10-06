import React from "react";
// import Head from "components/head";
import Head from "components/head";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";

import index from "styles/index.module.scss";

import Header from "components/top-header";
import Footer from "components/footer";

const Index = ({ memberData, title, description }) => {
  const memberRealData = memberData.map((member) => matter(member));
  const memberListItems = memberRealData.map(
    (memberListItem) => memberListItem.data
  );

  return (
    <>
      <Header />
      <main className={index.main}>
        <h2 className={index.h2}>
          Member<small>　メンバー</small>
        </h2>
        <ul className={index.member_list}>
          {memberListItems.map((member, i) => (
            <li key={i}>
              <Link href={`/member/${member.slug}`}>
                <a>
                  <Image
                    src={member.tmb}
                    alt={member.title + "のサムネイル"}
                    height="160"
                    width="160"
                    objectFit={"cover"}
                    decoding="async"
                    loading="lazy"
                  />
                  <h5>{member.title}</h5>
                  <p>{member.description}</p>
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

  const memberFiles = fs.readdirSync(`content/member`, "utf-8");
  const members = memberFiles.filter((fn) => fn.endsWith(".md"));
  const memberData = members.map((member) => {
    const memberPath = `content/member/${member}`;
    const memberRawContent = fs.readFileSync(memberPath, { encoding: "utf-8" });
    const memberEditedContent =
      memberRawContent.slice(0, 3) +
      "\nslug: " +
      { member }.member.slice(0, -3) +
      "\n" +
      memberRawContent.slice(3);
    return memberEditedContent;
  });

  return {
    props: {
      memberData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}
