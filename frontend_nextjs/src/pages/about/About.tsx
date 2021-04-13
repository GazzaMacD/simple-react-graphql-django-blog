import Head from "next/head";
//app imports
import { Header } from "../../components/modules/Header";

const About = () => {
  return (
    <div>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="l_container">
        <main className="l_main">
          <h1 className="t_title">About Us</h1>
        </main>
      </div>
      <footer className="m_footer"></footer>
    </div>
  );
};

export { About };
