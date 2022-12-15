import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';

const EditCommentComp = () =>{


    const [content, setContent] = useState('');

    let { id1, id2, id3 } = useParams();
    const navigate = useNavigate();
    const { http,  getToken } = AuthUser();

    const[gameCategories, setComments] = useState([]);
    useEffect(() =>{
        fetchComment();
    } , []);

    const fetchComment = () =>{
        http.get(`/gameCategories/${id1}/games/${id2}/comments/${id3}`).then((res) =>{
            setComments(res.data);
            setContent(res.data.content);
            console.log(res.data.content);
        }).catch(() =>{
            alert("Error with comment");
        })
    };

    const edit = async () => {
        console.log(getToken());
        console.log("content ", content);

        const data = {
            content: content
        }
        
        console.log(data);
        console.log(getToken());
        http.put(`gameCategories/${id1}/games/${id2}/comments/${id3}`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate(`/home/api/gameCategories/${id1}/games/${id2}/comments`);
            console.log(res.data);
        }).catch((error) => {
            alert("Cant edit comment");
            navigate(`/home/api/gameCategories/${id1}/games/${id2}/comments`);
        })
    }

    return(
        <div className="col-sm-4 offset-sm-4">
            <br></br>
            <h2>Edit comment</h2>
            <br></br>
            <label>Content</label>
            <input type = "textarea" defaultValue={content} onChange={(e)=>setContent(e.target.value)} className="form-control" placeholder="Content"/>
            <br></br>
            <button onClick={edit} className="btn btn-primary">Edit comment</button>
        </div>
    )
}

export class EditCommentComponent extends Component{
    render(){
        return(
                <EditCommentComp></EditCommentComp>
        )
    }
}