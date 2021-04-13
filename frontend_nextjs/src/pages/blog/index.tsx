import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/modules/Header";
import { getPosts } from "./services";
import { IAllPosts } from "./types";
//type getPostsData = Array<IAllPosts>;

const Blog: React.FC = (): React.ReactElement => {
    const [posts, setPosts] = useState<Array<IAllPosts> | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = getPosts();
        response
            .then((resp: any) => {
                setPosts(resp);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); // end useEffect

    return (
        <div>
            <Head>
                <title>Blog</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="l_container">
                <main className="l_main">
                    <h1 className="t_title">Our Blog</h1>
                    {isLoading && <p>Wait I'm Loading comments for you</p>}
                    {
                        !isLoading &&
                            posts.map((prod: IAllPosts, i: number) => {
                                return (
                                    <div key={i}>
                                        <a href={`/blog/${prod.slug}/`}>
                                            {prod.title}
                                        </a>
                                    </div>
                                );
                            }) // end map
                    }
                </main>
            </div>
            <footer className="m_footer"></footer>
        </div>
    );
};

export default Blog;
