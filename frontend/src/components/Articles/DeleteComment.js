import commentService from "../../services/comment.service";
import {Image} from "react-bootstrap"

const DeleteComments = () => {

    const deleteComment = () => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?");
        if (!confirmation) return console.log("Votre commentaire n'a pas été supprimé");

        const id = JSON.parse(localStorage.getItem('user'))
        commentService.deleteComment(id)
            .then(() => {
                console.log("Commentaire supprimé");
            })
            .catch((err) => {
                console.log(err, "Vous ne pouvez pas supprimer ce commentaire");
                window.alert("Vous ne pouvez pas supprimer ce commentaire");
            });

    }

    return (

        <>
            <Image type="submit" src="./img/X.jpg" className="sendComment_icon" roundedCircle onClick={() => deleteComment()} />
        </>
    )

}

export default DeleteComments;