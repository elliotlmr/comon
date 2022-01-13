import React from "react";
import Link from "next/link";
import styles from "../../styles/components/globals/Footer.module.scss";

export default class Footer extends React.Component {
  render() {
    return (
      <footer className={styles.container}>
        <Link href="/legals">Legals</Link>
      </footer>
    );
  }
}
