//types
import {
    CategoryType,
    PostType,
    AllPostsType,
    NewSubmittedPost,
    UpdateSubmittedPost,
} from "./BlogTypes";
type getCategoriesData = Array<CategoryType>;
type getPostsData = Array<AllPostsType>;

/*
 * Query Type Queries
 */
const getPosts = async (): Promise<getPostsData | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const allPostsQuery = `
      query {
        allPosts {
          title
          slug
        }
      }`;

    const response = await fetch(graphQLURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: allPostsQuery }),
    });

    type JSONResponse = {
        data?: {
            allPosts: Array<PostType>;
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
        const posts = data?.allPosts;
        return posts;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end getPosts

const getOnePost = async (slug: string): Promise<PostType | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const onePostQuery = `
      query {
        postBySlug(slug: "${slug}") {
          uuid
          title
          slug
          content
          category {
            uuid
            name
            slug
          }
        }
      }`;

    const response = await fetch(graphQLURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: onePostQuery }),
    });

    //set the type for JSON response
    type JSONOnePostResponse = {
        data?: {
            postBySlug?: PostType;
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONOnePostResponse = await response.json();
    if (response.ok) {
        return data?.postBySlug;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end getOnePost

const getCategories = async (): Promise<getCategoriesData | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const allCategoriesQuery = `
      query {
        allCategories {
            uuid
            name
            slug
        }
      }`;

    const response = await fetch(graphQLURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: allCategoriesQuery }),
    });

    type JSONResponse = {
        data?: {
            allCategories?: Array<CategoryType>;
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
        const categories = data?.allCategories;
        return categories;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end getCategories

/*
 * Mutation Type Queries
 */
const sendNewPost = async (
    postData: NewSubmittedPost,
    formDataObj: any
): Promise<AllPostsType | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const newPostMutation = `
            mutation {
                createPost(
                    title: "${postData.title}", 
                    content: "${postData.content}", 
                    categoryUuid: "${postData.categoryUuid}"
                ) {
                post {
                    title
                    slug 
                }
            }
        }
    `;
    formDataObj.append("query", newPostMutation);

    let response = await fetch(graphQLURL, {
        method: "POST",
        headers: {
            "Content-Tranfer-Encoding": "multipart/form-data",
            "Content-Type": "application/graphql",
        },
        body: formDataObj,

        //headers: { "Content-Type": "application/json" },
        //body: JSON.stringify({ query: newPostMutation }),
    });

    type JSONResponse = {
        data?: {
            createPost?: {
                post?: AllPostsType;
            };
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
        const createdPost = data?.createPost?.post;
        return createdPost;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end sendNew Post

const updatePost = async (
    postData: UpdateSubmittedPost
): Promise<PostType | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const updatePostMutation = `
            mutation {
                updatePost(
                    slug: "${postData.slug}",
                    title: "${postData.title}", 
                    content: "${postData.content}", 
                    categoryUuid: "${postData.categoryUuid}"
                ) {
                updatedPost {
                    title
                    slug 
                    uuid
                    content
                    category {
                        uuid
                        name
                    }
                }
            }
        }
        `;
    const response = await fetch(graphQLURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: updatePostMutation }),
    });

    type JSONResponse = {
        data?: {
            updatePost?: {
                updatedPost?: PostType;
            };
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
        const updatedPost = data?.updatePost?.updatedPost;
        return updatedPost;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end updatePost

const deletePost = async (slug: string): Promise<boolean | undefined> => {
    const graphQLURL = "http://127.0.0.1:8000/graphql/";
    const deletePostMutation = `
            mutation {
                deletePost(slug: "${slug}") { ok }
        }
        `;
    const response = await fetch(graphQLURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: deletePostMutation }),
    });

    type JSONResponse = {
        data?: {
            deletePost?: {
                ok?: boolean;
            };
        };
        errors?: Array<{ message: string }>;
    };

    const { data, errors }: JSONResponse = await response.json();
    if (response.ok) {
        const updatedPost = data?.deletePost?.ok;
        return updatedPost;
    } else {
        // handle graphql errors
        const error = new Error(
            errors?.map((e) => e.message).join("\n") ?? "unknown"
        );
        return Promise.reject(error);
    }
}; // end deletePost

export {
    sendNewPost,
    getCategories,
    getPosts,
    getOnePost,
    updatePost,
    deletePost,
};
