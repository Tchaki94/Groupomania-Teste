import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "../components/Users/BoardUser";
import CreatePost from "../components/Articles/Createpost";

function userProfile() {
	return (
		<Router>
			<Route path="/profile">
				<Profile />
			</Route>
		</Router>
	);
}

export default userProfile;