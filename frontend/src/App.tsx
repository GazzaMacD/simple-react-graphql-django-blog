import React, { useEffect, useState } from "react";
//Types
import { PostType } from "./types/BlogTypes";

const getPosts = async (): Promise<PostType[]> => {
  const response = await fetch("http://127.0.0.1:8000/graphql/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
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
      }`,
    }),
  });
  const result = await response.json();
  return result;
};
const App = () => {
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const result = getPosts();
    result
      .then((resp: any) => {
        const allPosts: any = resp.data.allPosts;
        setPosts(allPosts);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

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
