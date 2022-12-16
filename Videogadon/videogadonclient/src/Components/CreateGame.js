import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';
import { format } from 'date-fns'

const CreateGameComp = () =>{

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [platform, setPlatform] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [price, setPrice] = useState('')

    let { id1 } = useParams();

    const navigate = useNavigate();
    const { http, getUser, getToken } = AuthUser();

    const create = () => {
        console.log("name", name);
        console.log("description", description);

        const data = {
            Name: name,
            Description: description,
            Platform: platform,
            releaseDate: releaseDate,
            Price: price
        }
        console.log("data yay!!! ",data);
        console.log(getToken());
        http.post(`gameCategories/${id1}/games`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate(`/home/api/gameCategories/${id1}/games`);
            console.log(res.data);
        }).catch((error) => {
            alert("Cant create a game");
            navigate(`/home/api/gameCategories/${id1}games`);
        })
    }

    return(
        <div>
            <br></br>
            <h1>Create new game </h1>
            <div className="form-floating col-sm-2 offset-sm-5">
                <br></br>
                <h4>Name</h4>
                <input type = "text" defaultValue={name} onChange={(e)=>setName(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Name"/>
                <br></br>
                <h4>Description</h4>
                <textarea type = "text" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Description"/>
                <br></br>
                <h4>Platform</h4>
                <input type = "text" defaultValue={platform} onChange={(e)=>setPlatform(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Platform"/>
                <br></br>
                <h4>Release date</h4>
                <input type = "date" defaultValue={releaseDate} onChange={(e)=>setReleaseDate(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Release date"/>
                <br></br>
                <h4>Price</h4>
                <input type = "number" defaultValue={price} onChange={(e)=>setPrice(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Price"/>
                <br></br>
                <br></br>
                <button onClick={create} className="btn btn-primary btn-lg btn-block w-100 p-3 h-100 d-inline-block">Create game</button>
            </div>
        </div>
    )
}

export class CreateGameComponent extends Component{
    render(){
        return(
                <CreateGameComp></CreateGameComp>
        )
    }
}