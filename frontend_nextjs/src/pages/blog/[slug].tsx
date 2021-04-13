import Head from "next/head";
import { useRouter } from "next/router";
//scss
import styles from "./Blog.module.scss";

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="l_container">
      <Head>
        <title>Blog Detail for {slug} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="l_main">
        <h1 className="t_title">Blog Detail</h1>
        <p> This is the slug {slug}</p>
      </main>
    </div>
  );
};

export default BlogDetail;
