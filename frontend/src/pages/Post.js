import { BrowserRouter as Router, Route } from "react-router-dom";
import CreatePost from "../components/Articles/Createpost";
import Post from "../components/Articles/Createpost";

function Posts() {
	return (
		<Router>
			<Route path="/post">
			<CreatePost />
			</Route>
		</Router>
	);
}

export default Posts;