import React, { useEffect, useState, useRef } from "react";
import {
    sendNewPost,
    getCategories,
    getPosts,
    getOnePost,
    updatePost,
} from "./BlogAPIServices";
//types
import {
    CategoryType,
    AllPostsType,
    PostType,
    NewSubmittedPost,
    UpdateSubmittedPost,
} from "./BlogTypes";

const PostCreateOrUpdate: React.FC = () => {
    const titleInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const categoryInputRef = useRef<HTMLSelectElement>(null);
    // state
    const [categories, setCategories] = useState<Array<CategoryType> | []>([]);
    const [posts, setPosts] = useState<Array<AllPostsType> | []>([]);
    const [postToUpdate, setPostToUpdate] = useState<PostType | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userMessage, setUserMessage] = useState<string>("");

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

    /* Handlers =============== */
    const handleNewPost = () => {
        titleInputRef.current!.value = "";
        contentInputRef.current!.value = "";
        categoryInputRef.current!.value = "";
        setPostToUpdate(undefined);
    };

    const handleUpdate = async (slug: string) => {
        // get the post to be updated with api call
        try {
            const postResponse: PostType | undefined = await getOnePost(slug);
            // at present only caching one post but should probably cache all
            setPostToUpdate(postResponse);
            if (postResponse) {
                titleInputRef.current!.value = postResponse.title;
                contentInputRef.current!.value = postResponse.content;
                categoryInputRef.current!.value = postResponse.category.uuid;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePostDelete = async (slug: string) => {
        console.log("slug passed", slug);
    };

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        // check if it is update or new post
        if (postToUpdate) {
            // post update
            const updatePostData: UpdateSubmittedPost = {
                slug: postToUpdate.slug,
                title: titleInputRef.current!.value,
                content: contentInputRef.current!.value,
                categoryUuid: categoryInputRef.current!.value,
            };

            try {
                const response = await updatePost(updatePostData);
                setPostToUpdate(response);
                setUserMessage("updated!");
                setTimeout(() => {
                    setUserMessage("");
                }, 1000);
                const postsResponse = await getPosts();
                if (postsResponse) {
                    setPosts(postsResponse);
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            // new post
            const newPostData: NewSubmittedPost = {
                title: titleInputRef.current!.value,
                content: contentInputRef.current!.value,
                categoryUuid: categoryInputRef.current!.value,
            };
            try {
                const response = await sendNewPost(newPostData);
                // set flash message to user
                setUserMessage("New Post Created!");
                setTimeout(() => {
                    setUserMessage("");
                }, 1000);
                // set form fields to empty
                titleInputRef.current!.value = "";
                contentInputRef.current!.value = "";
                categoryInputRef.current!.value = "";
                const updatedPostsArray = posts.slice();
                if (response) {
                    updatedPostsArray.push(response);
                    setPosts(updatedPostsArray);
                }
            } catch (error) {
                console.log(error);
            }
        } //end else for postToUpdate
    };
    let formHeading = (
        <div>
            <h1>Create Post</h1>
        </div>
    );
    if (postToUpdate) {
        formHeading = (
            <div>
                <h1>Update Post</h1>
                <button onClick={handleNewPost}>New Post</button>
            </div>
        );
    }
    /* Returned jsx =================================== */
    return (
        <div>
            <section>
                {formHeading}
                <form onSubmit={submitHandler}>
                    <div>{userMessage && <p>{userMessage}</p>}</div>
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
                        posts.map((prod: AllPostsType, i: number) => {
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
