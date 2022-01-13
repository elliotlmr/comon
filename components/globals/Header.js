import React from "react";
import Link from "next/link";
import styles from "../../styles/components/globals/Header.module.scss";

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.container}>
        <Link href="/">
          <img src="./assets/chat.png" className={styles.logo} />
        </Link>
        <nav className={styles.menu}>
          <Link href="/explore">Explore</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </header>
    );
  }
}
