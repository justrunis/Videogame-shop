import React, {Component, useEffect, useState} from "react";
import { variables } from "../Variables.js";
import { Navigate, useParams} from 'react-router-dom';
import AuthUser from "../Services/AuthUser";
import GameCategory from "../Components/GameCategory"
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import gameCategory from "../Components/GameCategory";


const AllComments = () =>{

    let { id1 } = useParams();
    let { id2 } = useParams();
    const navigate = useNavigate();
    const { http, getUser, getToken } = AuthUser();
    const [Comment, setPost] = useState("");
        
        const[comments, setComments] = useState([]);
    useEffect(() =>{
        fetchComments();
    } , []);

    const fetchComments = () =>{
        axios.get(`http://localhost:5001/api/gameCategories/${id1}/games/${id2}/comments`)
        .then((res) => {
            //console.log(res);
            setComments(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    let CreateComment = async () =>{
        console.log("create new comment ");
        navigate(`comment`);
    }

    let EditComment = async (id) =>{
        console.log("edit comment with id", id);
        navigate(`comment/${id}`);
    }

    let RemoveComment = (id) =>{
        console.log("remove comment with id", id);
        http.delete(`/gameCategories/${id1}/games/${id2}/comments/${id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            alert("Cant delete comment");
            navigate(`/home/gameCategories/${id1}/games/${id2}/comments`);
        })
        window.location.reload(false);  
        navigate("/home/gameCategories/${id1}/games/${id2}/comments");
    }

    return(
        <div>
            <br></br>
                <h1>All comments</h1>
            <br></br>
            {getUser() != null ?(
                <div className="item-container">
                    <button onClick={ () => CreateComment()} className="blockButton">Create new comment</button>
                </div>
            ): null}
            <br></br>
                <div className="item-container">
                    {comments.map((comment) => (
                        <table id="gameInfo">
                            <tr class="tableformat">
                                <th>Comment</th>
                                <th>Date</th>
                                {getUser() != null && getUser().id == Comment.UserId ?(
                                <th>Edit</th>
                                ) : null}
                                {getUser() != null && getUser().id == Comment.UserId ?(
                                <th>Remove</th>
                                ) : null}
                                
                            </tr>
                            <tr class="tableformat">
                                <td>{comment.content}</td>
                                <td>{comment.creationDate}</td>
                                {getUser() != null && getUser().id == Comment.UserId ?(
                                <td className="container"><button onClick={ () => EditComment(comment.id)}  className="btn btn-dark btn-lg btn-block w-100 p-3 h-100 d-inline-block">Edit</button></td>
                                ) : null}
                                {getUser() != null && getUser().id == Comment.UserId ?(
                                <td><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) RemoveComment(comment.id) } }  className="btn btn-danger btn-lg btn-block w-100 p-3 h-100 d-inline-block">Remove</button></td>
                                ) : null}
                                
                            </tr>
                        </table>
                    ))}
                </div>
        </div>
        
    );
}
export default AllComments;

export class Comments extends Component{
    render(){
        return(
            <div>
                <AllComments></AllComments>
            </div>
        )
    }
}