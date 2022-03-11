import commentService from "../../services/comment.service";
import {Image} from "react-bootstrap"
import Img from "../../img/supr.png"

const DeleteComments = (props) => {

    const deleteComment = async () => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?");
        if (!confirmation) return console.log(id, confirmation);

        const id = props.comment.id
        const res= await commentService.deleteComment(id)
        console.log(res)
        if (res.data.affectedRows > 0 ) {
            props.setPosts(oldPosts => {
                let posts = [...oldPosts]
                const postIndex = posts.findIndex(elt => elt.id === props.comment.postId)
                const commentIndex = posts[postIndex].comments.findIndex(elt => elt.id === id)
                posts[postIndex].comments.splice(commentIndex, 1)
                return posts;
            })
        }

    }

    return (

        <>
            <Image type="submit" src={Img} alt="Suppression" className="sendComment_Delete_icon" roundedCircle onClick={() => deleteComment()} />
        </>
    )

}

export default DeleteComments;

