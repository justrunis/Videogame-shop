import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';

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
            RealeaseDate: releaseDate,
            Price: price
        }
        console.log(data);
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
        <div className="col-sm-4 offset-sm-4">
            <br></br>
            <h2>Create new game </h2>
            <br></br>
            <label>Name</label>
            <input type = "text" defaultValue={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name"/>
            <br></br>
            <label>Description</label>
            <input type = "textarea" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description"/>
            <br></br>
            <label>Platform</label>
            <input type = "textarea" defaultValue={platform} onChange={(e)=>setPlatform(e.target.value)} className="form-control" placeholder="Platform"/>
            <br></br>
            <label>Release date</label>
            <input type = "date" defaultValue={releaseDate} onChange={(e)=>setReleaseDate(e.target.value)} className="form-control" placeholder="Release date"/>
            <br></br>
            <label>Price</label>
            <input type = "number" defaultValue={price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price"/>
            <br></br>
            <button onClick={create} className="btn btn-primary">Create game</button>
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