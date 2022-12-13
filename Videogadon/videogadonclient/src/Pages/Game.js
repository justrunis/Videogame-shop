import React, {Component} from "react";
import AllGames from '../Routes/Games';
import '../App.css';


export class Game extends Component{
    render(){
        return(
            <div>
                <AllGames></AllGames>
            </div>
        )
    }
}