import { Router, Route } from "react-router-dom";
import React, {useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

import AuthService from "../services/auth.service";

const required = (value) => {
	if (!value) {
	  return (
		<div className="alert alert-danger" role="alert">
		  Ce champ est obligatoire!
		</div>
	  );
	}
};
  
const validEmail = (value) => {
	if (!isEmail(value)) {
	  return (
		<div className="alert alert-danger" role="alert">
		  Ce n'est pas un email valide.
		</div>
	  );
	}
};
  
const validName = (value) => {
	if (value.length < 3 || value.length > 20) {
	  return (
		<div className="alert alert-danger" role="alert">
		  Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
		</div>
	  );
	}
};
  
const vpassword = (value) => {
	if (value.length < 6 || value.length > 40) {
	  return (
		<div className="alert alert-danger" role="alert">
		  Le mot de passe doit comporter entre 6 et 40 caractères.
		</div>
	  );
	}
};


function Register() {
	const form = useRef();
  const checkBtn = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [preview, setPreview] = useState(null);
	const userImg = useRef();

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview("../assets/black_avatar.png");
		}
	}, [image]);

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		if (selected) {
			setImage(selected);
		} else {
			setImage(null);
		}
	};
	
  const addImageBtn = () => {
		userImg.current.click();
	};

  const confirmImg = () => {
		userImg(userImg.current.files[0]);
	};


  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(name, email, password, image).then(
        (response) => {
          console.log("register response", response);
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }


  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required, validName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <Form className="signup__avatar text-center">
                <Image src={preview} className="signup__avatar__img" roundedCircle />
                <input
                  type="file"
                  accept="image/*"
                  name="userImg"
                  id="image"
                  onChange={handleImageChange}
                  ref={userImg}
                  style={{ display: "none" }}
                  onSubmit={confirmImg}
                />
                <Button className="avatar__btn" onClick={addImageBtn}>
                  Ajouter une photo
                </Button>
              </Form>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">S'inscrire</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
}

export default Register;