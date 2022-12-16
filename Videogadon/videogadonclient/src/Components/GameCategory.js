import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";

const GameCategoryComp = () =>{

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const navigate = useNavigate();
    const { http, getUser, getToken } = AuthUser();

    const create = () => {
        console.log("name", name);
        console.log("description", description);

        const data = {
            name: name,
            description: description,
        }
        console.log(data);
        console.log(getToken());
        http.post('gameCategories/', data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate('/home');
            console.log(res.data);
        }).catch((error) => {
            alert("Cant create game category");
            navigate('/home');
        })
    }

    return(
        <div>
            <br></br>
            <h1>Create new game category</h1>
            <div className="form-floating col-sm-2 offset-sm-5">
                <br></br>
                <h4>Name</h4>
                <input type = "text" defaultValue={name} onChange={(e)=>setName(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Name"/>
                <br></br>
                <h4>Description</h4>
                <textarea type = "text" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Description"/>
                <br></br>
                <br></br>
                <button onClick={create} className="btn btn-primary btn-lg btn-block w-100 p-3 h-100 d-inline-block">Create category</button>
            </div>
        </div>
    )
}

export class GameCategoryComponent extends Component{
    render(){
        return(
                <GameCategoryComp></GameCategoryComp>
        )
    }
}