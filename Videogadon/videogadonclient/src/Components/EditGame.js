import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';

const EditGameComp = () =>{

    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Platform, setPlatform] = useState('');
    const [Price, setPrice] = useState('');
    const [Game, setGame] = useState("");

    let { id1, id2 } = useParams();
    const navigate = useNavigate();
    const { http,  getToken } = AuthUser();

    useEffect(() =>{
        fetchGame();
    } , []);

    const fetchGame = () =>{
        http.get(`/gameCategories/${id1}/games/${id2}`).then((res) =>{
            setGame(res.data);
            setName(res.data.name);
            setPlatform(res.data.platform);
            setPrice(res.data.price);
            setDescription(res.data.description);
            console.log("Name of game ",res.data.name);
        }).catch(() =>{
            alert("Error with game");
        })
    };

    const edit = async () => {
        console.log(getToken());
        console.log("description", Description);

        const data = {
            Name: Name,
            Description: Description,
            Platform: Platform,
            Price: Price
        }
        
        console.log(data);
        console.log(getToken());
        http.put(`gameCategories/${id1}/games/${id2}`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate(`/home/api/gameCategories/${id1}/games`);
            console.log(res.data);
        }).catch((error) => {
            alert("Cant edit game");
            navigate(`/home/api/gameCategories/${id1}/games`);
        })
    }

    return(
        <div>
            <br></br>
            <h1>Edit game</h1>
            <div className="form-floating col-sm-2 offset-sm-5">
                <br></br>
                <h4>Name</h4>
                <input type = "text" defaultValue={Name} onChange={(e)=>setName(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Name"/>
                <br></br>
                <h4>Description</h4>
                <textarea type = "text" defaultValue={Description} onChange={(e)=>setDescription(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Description"/>
                <br></br>
                <h4>Platform</h4>
                <input type = "text" defaultValue={Platform} onChange={(e)=>setPlatform(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Platform"/>
                <br></br>
                <h4>Price</h4>
                <input type = "number" defaultValue={Price} onChange={(e)=>setPrice(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Price"/>
                <br></br>
                <br></br>
                <button onClick={edit} className="btn btn-primary btn-lg btn-block w-100 p-3 h-100 d-inline-block">Edit game</button>
            </div>
        </div>
    )
}

export class EditGameComponent extends Component{
    render(){
        return(
                <EditGameComp></EditGameComp>
        )
    }
}