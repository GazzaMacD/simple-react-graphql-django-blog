import { TQuery } from "./types";

export const allPostsQuery: TQuery = `query {
    allPosts {
        title
        slug
    }
}
`;
