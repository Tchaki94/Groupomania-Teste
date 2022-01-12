import React, { useState, useEffect } from "react";
import { Button, Container, Image } from "react-bootstrap";

import userService from "../../services/user.service";

const BoardUser = (props) => {

    const [user, setUser] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const id = JSON.parse(localStorage.getItem('user')).userId;
      console.log('idee', id);
      userService.getUserById(id)
        .then((response) => {
          setIsLoaded(true);
          setUser(response.data);
          console.log(response);	
        })
        .catch((err) => {
          setIsLoaded(true);
          //console.log(err);
        });
    }, []);

    const handleDelete = async () => {
      const confirmation = window.confirm("Voulez vous vraiment supprimer votre compte ?");
      const id = JSON.parse(localStorage.getItem('user')).userId;
      if (!confirmation) return; console.log(id, confirmation)
      const res = await userService.deleteUser(id)
      console.log(res)
      localStorage.clear();
      props.logOut();
      props.history.push("/login");
    };

    const [image, setImage] = useState(null);
	  const [preview, setPreview] = useState(null);



  
    return (
      <Container className="profile">
        <div className="profile_header">
          <Image
            src={user.image ? user.image : "./img/iconprof.png"}
            className="profile_header_avatar"
            roundedCircle
          />
          <h3 className="text-center">
            Bonjour {user.name} <br />
            Que souhaitez-vous faire?
          </h3>
          <a href="/home " className="profile_footer_btn btn btn-secondary">
            Actualiter
          </a>
        </div>
        <hr />
        <div className="profile_footer">
          <Button className="btn-tertiaire" variant="primary" onClick={handleDelete}>
						Supprimer le compte !
				  </Button>
        </div>
		</Container>

    );
  };
  
  export default BoardUser;