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
        <div>
            <br></br>
            <h1>Edit game category</h1>
            <div className="form-floating col-sm-2 offset-sm-5">
                <br></br>
                <h4>Description</h4>
                <textarea type = "text" defaultValue={description} onChange={(e)=>setDescription(e.target.value)} className="form-control btn-lg btn-block w-100 p-3 h-100 d-inline-block" placeholder="Description"/>
                <br></br>
                <br></br>
                <button onClick={edit} className="btn btn-primary btn-lg btn-block w-100 p-3 h-100 d-inline-block">Edit category</button>
            </div>
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