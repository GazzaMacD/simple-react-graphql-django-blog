import React, { useEffect, useState, useRef } from "react";
import {
    sendNewPost,
    getCategories,
    getPosts,
    getOnePost,
} from "./BlogAPIServices";
//types
import { CategoryType, PostType } from "./BlogTypes";

const PostCreateOrUpdate: React.FC = () => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const categoryInputRef = useRef<HTMLSelectElement>(null);
    // state
    const [categories, setCategories] = useState<Array<CategoryType> | []>([]);
    const [posts, setPosts] = useState<Array<PostType> | []>([]);
    const [postToUpdate, setPostToUpdate] = useState<PostType | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    let categoriesList =
        categories.length > 0 &&
        categories.map((item: CategoryType, i: number) => {
            return (
                <option key={i} value={item.uuid}>
                    {item.name}
                </option>
            );
        }, this);

    useEffect(() => {
        const categoriesResponse = getCategories();
        const postsResponse = getPosts();
        categoriesResponse
            .then((resp: any) => {
                setCategories(resp);
            })
            .catch((err) => {
                console.error(err);
            });
        postsResponse
            .then((resp: any) => {
                setPosts(resp);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); // end useEffect <-- empty array means called once on render

    const handleUpdate = async (slug: string) => {
        console.log("slug passed", slug);
        // get the post to be updated with api call
        try {
            const postResponse: PostType | undefined = await getOnePost(slug);
            setPostToUpdate(postResponse);
            console.log(postToUpdate);
            if (postToUpdate) {
                titleInputRef.current!.value = postToUpdate.title;
                contentInputRef.current!.value = postToUpdate.content;
                categoryInputRef.current!.value = postToUpdate.category.uuid;
            }
        } catch (error) {
            console.log(error);
        }
        // makd a state of current post
        // update post boolean as well set to true
        // load post into form
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const postData = {
            title: titleInputRef.current!.value,
            content: contentInputRef.current!.value,
            categoryUuid: categoryInputRef.current!.value,
        };
        // if else start here -->
        const response = sendNewPost(postData);
        console.log("Response Promise", response);
        response
            .then((resp: any) => {
                // set form fields to empty
                titleInputRef.current!.value = "";
                contentInputRef.current!.value = "";
                categoryInputRef.current!.value = "";
                // copy posts array, add new post and update posts
                const updatedPostsArray = posts.slice();
                updatedPostsArray.push(resp);
                setPosts(updatedPostsArray);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div>
            <section>
                <h1>Create or Update Post</h1>
                <form onSubmit={submitHandler}>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input id="title" type="text" ref={titleInputRef} />
                    </div>
                    <div>
                        <label htmlFor="content">Content</label>
                        <textarea
                            id="content"
                            name="story"
                            rows={5}
                            cols={33}
                            ref={contentInputRef}
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="category-select">Category</label>
                        <select
                            name="categories"
                            id="category-select"
                            ref={categoryInputRef}
                        >
                            <option value="">--Choose a category--</option>
                            {categoriesList}
                        </select>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </section>

            <section>
                <h2>Post List</h2>
                {isLoading && <p>Wait I'm Loading comments for you</p>}
                {
                    !isLoading &&
                        posts.map((prod: PostType, i: number) => {
                            return (
                                <div key={i}>
                                    <a href={`/blog/${prod.slug}/`}>
                                        {prod.title}
                                    </a>
                                    <button
                                        onClick={() => handleUpdate(prod.slug)}
                                    >
                                        update
                                    </button>
                                    <button>delete</button>
                                </div>
                            );
                        }) // end map
                }
            </section>
        </div>
    );
};

export default PostCreateOrUpdate;
