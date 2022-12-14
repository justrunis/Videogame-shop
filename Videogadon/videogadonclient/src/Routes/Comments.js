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

    let EditComment = async (id) =>{
        console.log("edit comment with id", id);
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
                <h2>All comments</h2>
            <br></br>
                <div className="item-container">
                    <button  className="btn btn-secondary">Create new comment</button>
                </div>
            <br></br>
                <div className="item-container">
                    {comments.map((comment) => (
                        <table id="gameInfo">
                            <tr>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Edit</th>
                                <th>Remove</th>
                            </tr>
                            <tr>
                                <td>{comment.content}</td>
                                <td>{comment.creationDate}</td>
                                <td align='center'><button onClick={ () => EditComment(comment.id)}  className="btn btn-dark">Edit</button></td>
                                <td align='center'><button onClick={ () => RemoveComment(comment.id)}  className="btn btn-danger">Remove</button></td>
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