import Document, { Html, Head, Main, NextScript } from "next/document";
import { CONFIG } from "site.config";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={CONFIG.lang}>
        <Head>
          <link rel="icon" href="/logo.ico" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/logo.png"
          ></link>
          <link
            rel="alternate"
            type="application/rss+xml"
            title="RSS 2.0"
            href="/feed"
          ></link>

          {/* 홈 페이지 Open Graph 메타 태그 */}
          {this.props.__NEXT_DATA__.page === "/" && (
            <>
              <meta property="og:title" content={CONFIG.blog.title} />
              <meta property="og:description" content={CONFIG.blog.description} />
              <meta property="og:image" content="https://namo-log.vercel.app/images/thumbnail.jpg" />
              <meta property="og:url" content="https://namo-log.vercel.app/" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content={CONFIG.blog.title} />
              <meta name="twitter:description" content={CONFIG.blog.description} />
              <meta name="twitter:image" content="https://namo-log.vercel.app/images/thumbnail.jpg" />
              <meta name="twitter:url" content="https://namo-log.vercel.app/" />
            </>
          )}

          {/* Google Search Console */}
          {CONFIG.googleSearchConsole.enable === true && (
            <meta
              name="google-site-verification"
              content={CONFIG.googleSearchConsole.config.siteVerification}
            />
          )}
          {/* Naver Search Advisor */}
          {CONFIG.naverSearchAdvisor.enable === true && (
            <meta
              name="naver-site-verification"
              content={CONFIG.naverSearchAdvisor.config.siteVerification}
            />
          )}
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
