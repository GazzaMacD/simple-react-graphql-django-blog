import React, { useEffect, useState } from "react";
//
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useParams,
} from "react-router-dom";
//Types
import { PostType, AllPostsType } from "./types/BlogTypes";

type getPostsData = Array<AllPostsType>; // type for Posts

type JSONPostsResponse = {
  data?: {
    allPosts: Array<PostType>;
  };
  errors?: Array<{ message: string }>;
};
interface ParamTypes {
  slug: string;
}

type JSONOnePostResponse = {
  data?: {
    postBySlug: PostType;
  };
  errors?: Array<{ message: string }>;
};

interface ParamTypes {
  slug: string;
}

// Page Components
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Hi there</p>
    </div>
  );
};

const PostDetail = () => {
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

// UI functions
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
  //set the type for JSON response
  const { data, errors }: JSONPostsResponse = await response.json();
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

// App export
const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog/">Blog</Link>
            </li>
          </ul>
          <hr />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/blog/">
              <Posts />
            </Route>
            <Route path="/blog/:slug" children={<PostDetail />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
