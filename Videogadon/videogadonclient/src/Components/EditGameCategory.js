import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';

const EditGameCategoryComp = () =>{


    const [description, setDescription] = useState('');

    let { id1 } = useParams();
    const navigate = useNavigate();
    const { http,  getToken } = AuthUser();

    const[gameCategories, setGameCategories] = useState([]);
    useEffect(() =>{
        fetchGameCategory();
    } , []);

    const fetchGameCategory = () =>{
        http.get(`/gameCategories/${id1}`).then((res) =>{
            setGameCategories(res.data);
            setDescription(res.data.description);
            console.log(res.data.name);
        }).catch(() =>{
            alert("Error with game category");
        })
    };

    const edit = async () => {
        console.log(getToken());
        console.log("description", description);

        const data = {
            description: description
        }
        
        console.log(data);
        console.log(getToken());
        http.put(`gameCategories/${id1}`, data, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            navigate('/home');
            console.log(res.data);
        }).catch((error) => {
            alert("Cant edit game category");
            navigate('/home');
        })
    }

    return(
        <div className="col-sm-4 offset-sm-4">
            <br></br>
            <h2>Edit game category</h2>
            <br></br>
            <label>Description</label>
            <input type = "textarea" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" placeholder="Description"/>
            <br></br>
            <button onClick={edit} className="btn btn-primary">Edit category</button>
        </div>
    )
}

export class EditGameCategoryComponent extends Component{
    render(){
        return(
                <EditGameCategoryComp></EditGameCategoryComp>
        )
    }
}