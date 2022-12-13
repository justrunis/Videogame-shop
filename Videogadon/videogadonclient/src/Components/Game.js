import React, {Component, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthUser from "../Services/AuthUser";
import { Navigate, useParams} from 'react-router-dom';
import '../App.css';

const GameComp = () =>{

    const navigate = useNavigate();
    let { id1, id2 } = useParams();
    const { http, getUser, getToken } = AuthUser();
        
        const[game, setGameCategories] = useState([]);
    useEffect(() =>{
        fetchGamecateogories();
    } , []);

    const fetchGamecateogories = () =>{
        axios.get(`http://localhost:5001/api/gameCategories/${id1}/games/${id2}`)
        .then((res) => {
            //console.log(res);
            setGameCategories(res.data);
            //console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
        });
    };

    let ViewComments = (id3) =>{
        console.log("view comments for id:", id3);
        navigate(`comments`)

    }


    return(
        <div>
            <div className="row justify-content-center">
                <div class="container">
                    <h1>{game.name}</h1>
                    <br></br>
                        <table id="gameInfo">
                            <tr>
                                <th>Platform</th>
                                <td>{game.platform}</td>
                            </tr>
                            <tr>
                                <th>Description</th>
                                <td>{game.description}</td>
                            </tr>
                            <tr>
                                <th>Release Date</th>
                                <td>{game.releaseDate}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{game.price}</td>
                            </tr>
                        </table>
                </div>
                <br></br>
            </div>
                <br></br>
                    <div class="col text-center">
                        <button onClick={ () => ViewComments(game.id)}  className="btn btn-info centre">View comments</button>
                    </div>
        </div>
        
    );
};

export class GameComponent extends Component{
    render(){
        return(
                <GameComp></GameComp>
        )
    }
}