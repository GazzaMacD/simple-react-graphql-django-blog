import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

//Page Imports
import Home from "./pages/Home";
import PostDetail from "./pages/Blog/PostDetail";
import Posts from "./pages/Blog/Posts";
import PostCreateOrUpdate from "./pages/Blog/PostCreateOrUpdate";

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
                        <li>
                            <Link to="/dashboard/blog/edit-post">
                                Edit Post
                            </Link>
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
                        <Route exact path="/dashboard/blog/edit-post">
                            <PostCreateOrUpdate />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default App;
