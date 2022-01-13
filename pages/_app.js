import { useEffect, useState } from "react";
import Layout from "../components/globals/Layout";
import "../styles/globals.scss";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [title, setTitle] = useState("Com'On | Le réseau des entreprises");

  useEffect(() => {
    let str =
      router.pathname.substring(1).charAt(0).toUpperCase() +
      router.pathname.substring(1).slice(1);
    str !== ""
      ? setTitle(`Com'On | ${str}`)
      : setTitle("Com'On | Le réseau des entreprises");
  }, [router, title]);

  return (
    <Layout title={title}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Component {...pageProps} setTitle={setTitle} />
    </Layout>
  );
}

export default MyApp;
