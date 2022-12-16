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
        <div>
            <br></br>
            <h1>Create new comment </h1>
            <div className="form-floating col-sm-2 offset-sm-5">
                <br></br>
                <h4>Content</h4>
                <textarea type = "text" defaultValue={content} onChange={(e)=>setContent(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Content"/>
                <br></br>
                <br></br>
                <button onClick={create} className="btn btn-primary btn-lg btn-block w-100 p-3 h-100 d-inline-block">Create comment</button>
            </div>
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