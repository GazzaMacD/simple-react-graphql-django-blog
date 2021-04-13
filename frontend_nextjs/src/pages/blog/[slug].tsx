import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../../components/modules/Header";
//scss
import styles from "./Blog.module.scss";

const BlogDetail = () => {
    const router = useRouter();
    const { slug } = router.query;

    return (
        <div className="l_container">
            <Head>
                <title>{slug}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="l_container">
                <main className="l_main">
                    <h1 className="t_title">Blog Detail</h1>
                    <p> This is the slug: {slug}</p>
                </main>
            </div>
            <footer className="m_footer"></footer>
        </div>
    );
};

export default BlogDetail;
