import React, {Component, useEffect, useState} from "react";
import { variables } from "../Variables.js";
import { Navigate, useParams} from 'react-router-dom';
import AuthUser from "../Services/AuthUser";
import GameCategory from "../Components/GameCategory"
import { Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import gameCategory from "../Components/GameCategory";
import { Game } from "../Pages/Game.js";

const AllGames = () =>{

    let { id1 } = useParams();
    const navigate = useNavigate();
    const { http, getUser, getToken } = AuthUser();
    const [Game, setGame] = useState("");
        
        const[games, setGames] = useState([]);
    useEffect(() =>{
        fetchGames();
    } , []);

    const fetchGames = () =>{
        axios.get(`http://localhost:5001/api/gameCategories/${id1}/games`)
        .then((res) => {
            //console.log(res);
            setGames(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };

    let ViewGame = (id2) =>{
        console.log("view game for id:", id2);
        navigate(`${id2}`)

    }

    let CreateGame = async () =>{
        console.log("create new game ");
        navigate(`game`)
    }

    let EditGame = async (id) =>{
        console.log("edit game with id", id);
        navigate(`game/${id}`)
    }

    let RemoveGame = (id) =>{
        console.log("remove game with id", id);
        http.delete(`/gameCategories/${id1}/games/${id}`,{
            headers:{
                "Content-type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
        }).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            alert("Cant delete game");
            navigate(`/home/gameCategories/${id1}/games`);
        })
        window.location.reload(false);  
        navigate("/home/gameCategories/${id1}/games");
    }

    return(
        <div>
            <br></br>
                <h2>All games</h2>
            <br></br>
            {getUser() != null ?(
                <div className="item-container">
                    <button onClick={ () => CreateGame()} className="btn btn-secondary">Create new game</button>
                </div>
            ): null}
            <br></br>
            <div className="item-container">
                {games.map((game) => (
                              <div className='card'>
                                <img src="https://www.iconpacks.net/icons/1/free-game-controller-icon-1416-thumb.png" alt=""></img>
                                <h3>{game.name}</h3>
                                <br></br>
                                <button onClick={ () => ViewGame(game.id)}  className="btn btn-info">More about {game.name}</button>
                                <br></br>
                                {getUser() != null && getUser().id == Game.UserId ?(
                                <button onClick={ () => EditGame(game.id)}  className="btn btn-dark">Edit</button>
                                ) : null}
                                <br></br>
                                {getUser() != null && getUser().id == Game.UserId ?(
                                <button onClick={ () => RemoveGame(game.id)}  className="btn btn-danger">Remove</button>
                                ) : null}
                                <br></br>
                              </div>
                ))}
            </div>
        </div>
    );
}
export default AllGames;