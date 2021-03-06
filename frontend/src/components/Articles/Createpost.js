import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import userService from "../../services/user.service";
import Input from "react-validation/build/input";
import axios from "axios";
import Img from "../../img/imgjpg.png"

function CreatePost() {

    const [user, setUser] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
		const id = JSON.parse(localStorage.getItem('user')).userId;
		//console.log('idee', id);
		userService.getUserById(id)
			.then((response) => {
				setIsLoaded(true);
				setUser(response.data);
				//console.log(response);	
			})
			.catch((err) => {
				setIsLoaded(true);
				//console.log(err);
			});
	}, []);

	const [imageContent, setImageContent] = useState(null);
	const [previewContent, setPreviewContent] = useState(Img);
	
	const imgInputRef = useRef(null);
	
	useEffect(() => {
		if (imageContent) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewContent(reader.result);
			};
			reader.readAsDataURL(imageContent);
		} else {
			setPreviewContent(Img);
		}
	}, [imageContent]);

	const onButtonClick = (ref) => {
		ref.current.click();
	};

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		if (selected) {
			setImageContent(selected);
		} else {
			setImageContent(null);
		}
	};


    const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};
    
	const [descrip, setDescrip] = useState();
	const [titre, setTitre] = useState();
	const [file, setFile] = useState();
	
	const selectImg = (e) => {
		setFile(e.target.files[0]);
	};

	const validateImg = (e) => {
		selectImg(e);
		handleImageChange(e);
	};

	const selectDescrip = (e) => {
		setDescrip(e.target.value);
	};

	const selectTitre = (e) => {
		setTitre(e.target.value);
	};




    const handlePost = (e) => {
		e.preventDefault();

		const token = JSON.parse(localStorage.getItem("user")).token;
		//console.log(token);
		let formData = new FormData();
		if(descrip?.length > 0 && titre?.length > 0) {
		formData.append("descrip", descrip);
		formData.append("titre", titre);
		formData.append("image", file);
		axios.post("http://localhost:3000/api/post", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
		})
			.then(() => {
				console.log("Publication cr????e");
				handleClose();
			})
			.catch((err) => console.log(err));
			console.log(formData);
		}else{
			alert('Veuillez remplir tous les champs')
		}
	};

    return (
		<>
			<Container className="CreatePost">
				<Image
					src={"./img/iconprof.png"}
					className="CreatePost_avatar"
					roundedCircle
				/>
				<div className="CreatePost_text" onClick={handleShow} role="button">
					Bonjour {user.name} ! Que souhaitez-vous publier ?
				</div>
			</Container>
			<form>
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header className="CreatePost_title">
						<Modal.Title>Cr??er une publication</Modal.Title>
					</Modal.Header>
					<Modal.Body className="CreatePost_modal">
						<Row>
							<Container>
							<Modal.Title>Votre titre</Modal.Title>
								<Form.Control
									required
									as="textarea"
									className="CreatePost_text"
									onChange={selectTitre}
									placeholder="Mettez un titre ?? votre publication (50 caract??res max)"
									maxLength="50"
								/>
							</Container>
						</Row>
						<Row className="display">
							<Col>
								<Container className="CreatePost_previewContainer">
									<Image src={previewContent} className="CreatePost_preview" />
								</Container>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button className="CreatePost_input" onClick={() => onButtonClick(imgInputRef)}>
									<input
										type="file"
										accept="image/*"
										id="postImg"
										name="postImg"
										onChange={validateImg}
										ref={imgInputRef}
										style={{ display: "none" }}
									/>
									<span>Ajouter une photo</span>
								</Button>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Body className="CreatePost_modal">
						<Row>
							<Container>
							<Modal.Title>Votre description</Modal.Title>
								<Form.Control
									required
									as="textarea"
									className="CreatePost_text"
									onChange={selectDescrip}
									placeholder="Description de votre publication ( 250 caract??res max)"
									maxLength="250"
								/>
							</Container>
						</Row>
					</Modal.Body>
					<Modal.Footer className="CreatePost__modal">
						<div className="CreatePost_btns">
							<Row>
								<Col>
									<Button className="CreatePost_btn" variant="secondary" onClick={handleClose}>
										Annuler
									</Button>
								</Col>
								<Col>
									<Button className="CreatePost_btn" variant="primary" onClick={handlePost} >
										Publier
									</Button>
								</Col>
							</Row>
						</div>
					</Modal.Footer>
				</Modal>
			</form>
		</>
	);
	
}

export default CreatePost;