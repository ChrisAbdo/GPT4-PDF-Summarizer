import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Summarize any PDF in seconds." />
          <meta
            property="og:site_name"
            content="https://pdfsummary.vercel.app/"
          />
          <meta
            property="og:description"
            content="Summarize any PDF in seconds."
          />
          <meta property="og:title" content="Summarize any PDF in seconds." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Summarize any PDF in seconds." />
          <meta
            name="twitter:description"
            content="Summarize any PDF in seconds."
          />
          <meta property="og:image" content="/image.jpeg" />
          <meta name="twitter:image" content="/image.jpeg" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
