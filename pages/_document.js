// https://www.johanbleuzen.fr/blog/next-remove-clientside-javascript
import Document, { Html, Head, Main, NextScript } from "next/document";

class HeadProduction extends Head {
  render() {
    const { head } = this.context._documentProps;
    const children = this.props.children;
    return (
      <head {...this.props}>
        {children}
        {head}
        {this.getCssLinks()}
      </head>
    );
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const isDev = process.env.NODE_ENV === "development";
    return (
      <Html lang="ja">
        {isDev ? <Head /> : <HeadProduction />}
        <body>
          <Main />
          {isDev && <NextScript />}
        </body>
      </Html>
    );
  }
}

export default MyDocument;


// import Document, { Html, Head, Main, NextScript } from 'next/document'

// export default class MyDocument extends Document {
//   render() {
//     return (
//       <Html lang="jp">
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }



// import Document, { Html, Main, NextScript } from 'next/document'
// import Head from 'components/head';

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx)
//     return { ...initialProps }
//   }

//   render() {
//     return (
//       <Html lang="jp">
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     )
//   }
// }

