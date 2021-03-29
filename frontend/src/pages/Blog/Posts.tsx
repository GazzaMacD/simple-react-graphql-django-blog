import React, { useEffect, useState } from "react";
import { PostType } from "./BlogTypes";
import { getPosts } from "./BlogAPIServices";

const Posts = () => {
    const [posts, setPosts] = useState<Array<PostType> | []>([]);
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
            <h1>My Blog</h1>
            {isLoading && <p>Wait I'm Loading comments for you</p>}
            {
                !isLoading &&
                    posts.map((prod: PostType, i: number) => {
                        return (
                            <div key={i}>
                                <a href={`/blog/${prod.slug}/`}>{prod.title}</a>
                            </div>
                        );
                    }) // end map
            }
        </div>
    );
};
export default Posts;
