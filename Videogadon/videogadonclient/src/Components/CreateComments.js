import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';

const CreateCommentComp = () =>{

    const [content, setContent] = useState('')

    let { id1, id2} = useParams();

    const navigate = useNavigate();
    const { http, getUser, getToken } = AuthUser();

    const create = () => {
        console.log("content", content);

        const data = {
            Content: content
        }
        console.log(data);
        console.log(getToken());
        http.post(`gameCategories/${id1}/games/${id2}/comments`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate(`/home/api/gameCategories/${id1}/games/${id2}/comments`);
            console.log(res.data);
        }).catch((error) => {
            alert("Cant create a comment");
            navigate(`/home/api/gameCategories/${id1}games/${id2}/comments`);
        })
    }

    return(
        <div className="col-sm-4 offset-sm-4">
            <br></br>
            <h2>Create new comment </h2>
            <br></br>
            <label>Content</label>
            <input type = "text" defaultValue={content} onChange={(e)=>setContent(e.target.value)} className="form-control" placeholder="Content"/>
            <br></br>
            <button onClick={create} className="btn btn-primary">Create comment</button>
        </div>
    )
}

export class CreateCommentComponent extends Component{
    render(){
        return(
                <CreateCommentComp></CreateCommentComp>
        )
    }
}