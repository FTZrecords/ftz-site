import React from "react";
import Link from "next/link";
import index from "styles/index.module.scss";
import footer from "styles/footer.module.scss";

class Footer extends React.Component {
  render() {
    return (
      <>
        <aside>
          <h2 className={index.h2} id="contact">
            Contact<small>　お問い合わせ</small>
          </h2>
          <p className={index.contact_form}>
            一緒に音楽の楽しさを伝えていくレーベルをお探しですか？FTZ
            recordsならあなたの音楽をさらに広げていくことができます。どうぞお気軽にご連絡ください。
          </p>
          <form
            className={index.contact_form}
            action="https://api.staticforms.xyz/submit"
            method="post"
          >
            <input
              type="hidden"
              name="accessKey"
              value="6a58a740-b8ce-4b0a-a6a3-e5106bd415c0"
            />
            <input
              className={index.name}
              type="text"
              name="name"
              placeholder="お名前"
            />
            <input
              className={index.email}
              type="text"
              name="email"
              placeholder="メールアドレス"
            />
            <textarea
              className={index.message}
              name="message"
              placeholder="お問い合わせ内容"
            ></textarea>
            <button className={index.button} type="submit">
              SUBMIT
            </button>
          </form>
        </aside>
        <footer className={footer.footer}>
          <div>
            <ul>
              <li>
                <Link href="/zine">
                  <a>FTZine - FTZrecordsによるジン</a>
                </Link>
                <ul>
                  <li>
                    <Link href="/#interview">
                      <a>INTERVIEW　インタビュー</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#column">
                      <a>COLUMN　コラム</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#playlist">
                      <a>PLAYLIST　プレイリスト</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href="/#news">
                  <a>News - 最新情報</a>
                </Link>
              </li>
              <li>
                <Link href="https://www.ftzrecords.com/artist">
                  <a>Artist - 所属アーティスト</a>
                </Link>
              </li>
              <li>
                <Link href="https://www.ftzrecords.com/#comp-jxanll648" target="_blank">
                  <a>Contact - お問い合わせ</a>
                </Link>
              </li>
            </ul>
            <div>
              <a href="https://ftzrecords.com/"  target="_blank">
                <span>©︎FTZrecords</span>
              </a>
              <a href="https://2001y.me"  target="_blank">
                Designed by <span>2001Y</span>
              </a>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
