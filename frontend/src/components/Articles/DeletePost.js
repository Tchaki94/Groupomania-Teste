import postService from "../../services/post.service";
import {Image} from "react-bootstrap"
import Img from "../../img/supr.png"

const DeletePosts = (props) => {

    const deletePost = async () => {

        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire?");
        if (!confirmation) return console.log(id, confirmation);

        const id = props.post.id
        const res = await postService.deletePost(id)
        console.log(res)

        if (res.data.affectedRows > 0 ) {
            props.setPosts(oldPosts => {
                let posts = [...oldPosts]
                const postIndex = posts.findIndex(elt => elt.id === id)
                posts[postIndex].posts.splice(postIndex, 1)
                return posts;
            })
        }
        
        
    }

    return (

        <>
            <Image type="submit" src={Img} alt="Suppression" className="sendPost_Delete_icon" roundedCircle onClick={() => deletePost()} />
        </>
    )

}

export default DeletePosts;

/*
if (res.data.affectedRows > 0 ) {
            props.setPosts(oldPosts => {
                let posts = [...oldPosts]
                const index = posts.findIndex(elt => elt.id === props.post.id)
                const postIndex = posts[index].post.findIndex(elt => elt.id === id)
                posts[index].post.splice(postIndex, 1)
                return posts;
            })
        }
*/