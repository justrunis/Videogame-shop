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
        <div className="col-sm-4 offset-sm-4">
            <br></br>
            <h2>Edit game</h2>
            <br></br>
            <label>Name</label>
            <input type = "text" defaultValue={Name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Name"/>
            <br></br>
            <label>Description</label>
            <input type = "textarea" defaultValue={Description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description"/>
            <br></br>
            <label>Platform</label>
            <input type = "textarea" defaultValue={Platform} onChange={(e)=>setPlatform(e.target.value)} className="form-control" placeholder="Platform"/>
            <br></br>
            <label>Price</label>
            <input type = "number" defaultValue={Price} onChange={(e)=>setPrice(e.target.value)} className="form-control" placeholder="Price"/>
            <br></br>
            <button onClick={edit} className="btn btn-primary">Edit game</button>
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