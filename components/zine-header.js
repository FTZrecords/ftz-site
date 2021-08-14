import React from 'react';
import Link from "next/link";
import index from 'styles/index.module.scss'

class Header extends React.Component {
  render() {
    return (
        <header className={index.header}>
        <h1>
          <Link href="/"><a><img src="/zine/logo.svg"></img></a></Link>
          <small><Link href="/"><a>by FTZrecords</a></Link></small>
        </h1>
        <input type="checkbox" id="vehicle1" name="vehicle1" className={index.menu_input} />
        <div className={index.menu_list}>
          <ul>
            <li>
              <Link href="/">
                <a><small>FTZについて</small>Top</a>
              </Link>
            </li>
            <li>
              <Link href="/news">
                <a><small>最新情報</small>News</a>
              </Link>
            </li>
            <li>
              <Link href="/artist">
              <a><small>所属アーティスト</small>Artist</a>
              </Link>
            </li>
            <li>
              <Link href="/member">
                <a><small>メンバー</small>Member</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a><small>お問い合わせ</small>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
        <label htmlFor="vehicle1"></label>
        <label htmlFor="vehicle1"></label>
      </header>
    );
  }
}

export default Header;