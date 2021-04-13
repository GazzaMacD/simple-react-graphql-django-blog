import React from "react";
import Link from "next/link";

import css from "./Header.module.scss";

const Header: React.FC = (): React.ReactElement => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.nav}>
          <li>
            <Link href="/">
              <a>Logo</a>
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/">
              <a>home</a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a>about</a>
            </Link>
          </li>
          <li>
            <Link href="/blog">
              <a>blog</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
