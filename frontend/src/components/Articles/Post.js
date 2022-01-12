import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import axios from "axios";
import postService from "../../services/post.service";
import userService from "../../services/user.service";
import commentService from "../../services/comment.service"



function PostList() {


    const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState(null);

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
	/*
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
	}, []); */

    // recuperation + comment
	const [comment, setComment] = useState();
	/*
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
	}, []); */

    const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};
    

	const selectComment = (e) => {
		setComment(e.target.value);
	};


	const handleComment = (e) => {
		e.preventDefault();

		const token = JSON.parse(localStorage.getItem("user")).token;

		let formData = new FormData();
		formData.append("Comment", Comment);

		axios.post("http://localhost:3000/api/comment", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
		})
		.then(() => {
			console.log("Commentaire créé !");
            handleClose();
		})
		.catch((err) => console.log(err));
		console.log(formData);
};



    return(
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
							{post.comments?.map(comment => (<div key={"comment"-comment.id}>{comment.username} : </div>))}
						</div>
						<div className="post_bottom_text">
							 {post.comments?.map(comment => (<div key={"comment"-comment.id}>{comment.comment}</div>))}
						</div>
					</div>
				</div>
				<hr />
				<>
                <Container className="CreateComment">
                    <Image
                        src={"./img/iconprof.png"}
                        className="CreateComment_avatar"
                        roundedCircle
                    />
                    <div className="CreateComment_text" onClick={handleShow} role="button">
                        Bonjour {post.userName} ! Que souhaitez-vous commenter ?
                    </div>
                </Container>
                <form>
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header className="CreateComment_title">
                            <Modal.Title>Créer un commentaire</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="CreateComment_modal">
                            <Row>
                                <Container>
                                <Modal.Title>Votre commentaire</Modal.Title>
                                    <Form.Control
                                        as="textarea"
                                        className="CreateComment_text"
                                        onChange={selectComment}
                                        placeholder="Description de votre commentaire ( 250 caractères max)"
                                        maxLength="250"
                                    />
                                </Container>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer className="CreateComment__modal">
                            <div className="CreateComment_btns">
                                <Row>
                                    <Col>
                                        <Button className="CreateComment_btn" variant="secondary" onClick={handleClose}>
                                            Annuler
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button className="CreateComment_btn" variant="primary" onClick={handleComment}>
                                            Commenter
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </form>
            </>
            </div>))
            }
        </Container> )}
	    {!isLoaded && (<p>Chargement...</p>)}
	    </>
    )
}

export default PostList;