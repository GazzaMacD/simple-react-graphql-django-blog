import React, { useEffect, useState } from "react";
//Types
import { PostType } from "./types/BlogTypes";
type getPostsData = Array<PostType>;
type JSONResponse = {
  data?: {
    allPosts: Array<PostType>;
  };
  errors?: Array<{ message: string }>;
};

const getPosts = async (): Promise<getPostsData | undefined> => {
  const graphQLURL = "http://127.0.0.1:8000/graphql/";
  const allPostsQuery = `
      query {
        allPosts {
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
    body: JSON.stringify({ query: allPostsQuery }),
  });
  //set the type for JSON response
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

const App = () => {
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
    <div className="App">
      <h1>My Blog</h1>
      {isLoading && <p>Wait I'm Loading comments for you</p>}
      {
        posts.map((prod: PostType, i: number) => {
          return (
            <div key={i}>
              <a href={`blog/${prod.slug}/`}>{prod.title}</a>
            </div>
          );
        }) // end map
      }
    </div>
  );
};

export default App;
