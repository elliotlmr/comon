import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../../styles/components/globals/Layout.module.scss";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
    };
  }

  render() {
    return (
      <>
        {/* <Head>
          <html lang="fr" />
          <title>{this.props.title}</title>
        </Head> */}
        <Header />
        <main className={styles.container}>{this.props.children}</main>
        <Footer />
      </>
    );
  }
}
