import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "../components/Articles/PostList";



export default function Home() {
	return (
			<Router>
				<Route path="/home">
				<Posts />
				</Route>
			</Router>
	);
}