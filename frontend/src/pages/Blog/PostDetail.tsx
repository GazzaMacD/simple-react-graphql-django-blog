import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getOnePost } from "./BlogAPIServices";
//types
import { PostType } from "./BlogTypes";

const PostDetail = () => {
    interface ParamTypes {
        slug: string;
    }
    let { slug } = useParams<ParamTypes>();
    const [post, setPost] = useState<PostType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = getOnePost(slug);
        response
            .then((resp: any) => {
                setPost(resp);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [slug]); // end useEffect
    return (
        <div>
            <h1>Detail Page</h1>
            {isLoading && <p>Wait I'm Loading comments for you</p>}
            {post && (
                <div>
                    <h1>{post.title}</h1>
                    <div>{post.content}</div>
                </div>
            )}
        </div>
    );
};

export default PostDetail;
