import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import { Header } from "../components/modules/Header";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="l_container">
        <main className="l_main">
          <h1 className="t_title">Welcome to Simple React Blog</h1>
        </main>
      </div>
      <footer className="m_footer"></footer>
    </div>
  );
};

export default Home;
