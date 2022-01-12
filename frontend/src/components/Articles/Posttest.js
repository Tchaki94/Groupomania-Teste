import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import postService from "../../services/post.service"
import userService from "../../services/user.service";
import commentService from "../../services/comment.service"
import Comments from "../Comments/Comments";
import axios from "axios";

import Comment from "../Comments/Comments";
import ModifyPost from "./Modifypost";
import CreatePost from "./Createpost";

function PostList() {

	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

	const [isLoaded, setIsLoaded] = useState(false);

	

	// recuperation post
	useEffect(() => {
		postService.getAllPost()
			.then((response) => {
				setTimeout(() => {
					setIsLoaded(true);
					setPosts(response.data);
					console.log(response);
				}, 1000)
				
			})
			.catch((err) => {
				setIsLoaded(true);
				//console.log(err);
			});
	}, []);

	
	// récuperation user
	useEffect(() => {
		const id = JSON.parse(localStorage.getItem('user')).userId;
		console.log('idee', id);
		userService.getUserById(id)
			.then((response) => {
				setIsLoaded(true);
				setUsers(response.data);
				//console.log(response);	
			})
			.catch((err) => {
				setIsLoaded(true);
				//console.log(err);
			});
	}, []); 


	// recuperation + comment
	const [comment, setComment] = useState();

	useEffect(() => {
		commentService.getAllComment()
			.then((response) => {
				setIsLoaded(true);
				setComment(response.data);
				//console.log(response);
			})
			.catch((err) => {
				setIsLoaded(true);
				//console.log(err);
			});
	}, []);

	const [createComment, setCreateComment] = useState();

	const selectCreateComment = (e) => {
		setCreateComment(e.target.value);
	};


	const handleComment = (e) => {
		e.preventDefault();

		const token = JSON.parse(localStorage.getItem("user")).token;

		let formData = new FormData();
		formData.append("createComment", createComment);

		axios.post("http://localhost:3000/api/comment", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
		})
		.then(() => {
			console.log("Commentaire créé !");
		})
		.catch((err) => console.log(err));
		console.log(formData);
};


	
	return (
		<>
		{isLoaded && (<Container className="post">
			{posts.map(post => (<div key={"post"+post.id} className="post_container">
				<div className="post_top">
					<div className="post_topLeft">
						<img
							className="post_topLeft_img"
							src={"./img/iconprof.png"
							}
							alt="Profil"
						/>
						<span className="post_topLeft_username">
							{post.userName} 
						</span>
						<span className="post_topLeft_date">
							- posté le {post.date_pub}
						</span>
					</div>
					<div className="post_topRight">  
						
					</div>
				</div>
				<div className="post_center">
					<span className="post_center_text">
						{post.titre}
					</span>
				</div>
				<div className="post_bottom">
					<div
						className="post_bottomRight"
						>
						<span className="post_bottom_text">
							 {post.descrip}
						</span>
					</div>
				</div>
				<hr />
				<div className="post_bottom">
					<div className="post_bottomRight">
						<div className="post_bottom_text">
							{post.comments?.map(comment => (<div key={"comment"-comment.id}>{comment.username} : </div>))}
						</div>
						<div className="post_bottom_text">
							 {post.comments?.map(comment => (<div key={"comment"-comment.id}>{comment.comment}</div>))}
						</div>
					</div>
				</div>
				<hr />
				<form
					className="sendComment"
					onSubmit={(e) => {
					e.preventDefault();
					}}
				>
				
				<input
					as="textarea"
					className="sendComment_input"
					placeholder="Écrivez un commentaire..."
					onKeyPress={(event) =>
						event.key === "Enter" && handleComment()
					}
				/>
				<Image
					type="submit"
					src="./img/iconprof.png"
					className="sendComment_icon"
					roundedCircle
					role="button"
					onClick={() => handleComment()}
					/>
				</form>
				</div>))
				}
	</Container> )}
		{!isLoaded && (<p>Chargement...</p>)}
		</>
		
					
						
							
	);
}
	
export default PostList;       