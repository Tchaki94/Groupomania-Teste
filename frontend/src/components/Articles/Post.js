import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";

import postService from "../../services/post.service";
import userService from "../../services/user.service";
import commentService from "../../services/comment.service"



function PostList() {


    const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	

	// recuperation post
	useEffect(() => {
		postService.getAllPost()
			.then((response) => {
				console.log(response);
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

	const handleComment = (e) => {
		e.preventDefault();
		console.log(e.target.dataset)
		const token = JSON.parse(localStorage.getItem('user')).token;
		let newComment = {
			post_id: e.target.dataset.postid,
			comment: comment
		}
		console.log('nouveau commentaire', JSON.stringify(newComment))
		
		//console.log(id);

		commentService.creatComment(newComment)
		.then(() => {
			console.log("Commentaire créé !");
		})
		.catch((err) => console.log(err));
    };

	const selectTextComment = (e) => {
		setComment(e.target.value);
	};


    return(
        <>
		{isLoaded && (<Container className="post">
			{posts.map(post => (<article key={"post"+post.id} className="post_container" data-id={post.id}>
				<div className="post_top">
					<div className="post_topLeft">
						<img
							className="post_topLeft_img"
							src={"./img/iconprof.png"}
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
					<div className="post_bottomRight">
						<span className="post_bottom_text">
							 {post.descrip}
						</span>
					</div>
				</div>
				<div className="post_bottom_img">
					<div className="post_bottomRight_img">
						<span className="Img_comment_preview">
							<img src={post.image} alt={post.title} />
						</span>
					</div>
				</div>
				<hr />
				<div className="post_bottom">
					<div className="post_bottomRight">
						<div className="post_bottom_text">
							{post.comments?.map(comment => (<div key={"comment-" + comment.id}>{comment.username} : - posté le {comment.date_pub}<br></br> {comment.comment}<hr /></div>))}
						</div>
					</div>
				</div>
				<hr />
				<>
                <form className="sendComment" onSubmit={(e) => {e.preventDefault()}}>
					<Image
						src="./img/iconprof.png"
						className="comment_avatar"
						roundedCircle
					/>
					<input
						as="textarea"
						className="sendComment_input"
						placeholder="Écrivez un commentaire..."
						onChange={selectTextComment}
						onKeyPress={(event) => event.key === "Enter" && handleComment()}
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
            </>
            </article>))
            }
        </Container> )}
	    {!isLoaded && (<p>Chargement...</p>)}
	    </>
    )
}

export default PostList;