import { allPostsQuery } from "./queries";
//types
import { IAllPosts, TQuery } from "./types";
type getPostsData = Array<IAllPosts>;

// dev baseUrl
//const baseURL = "http://127.0.0.1:8000";
//mobile dev baseUrl
const baseURL = "http://192.168.1.68:8000";
// staging baseUrl
//const baseURL = "http://api.sportify.life";

const getPosts = async (): Promise<getPostsData | undefined> => {
    const graphQLURL = baseURL + "/graphql/";
    const allPostsQuery: TQuery = `query {
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
            allPosts: Array<IAllPosts>;
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
}; // this end getPosts

export { getPosts };
