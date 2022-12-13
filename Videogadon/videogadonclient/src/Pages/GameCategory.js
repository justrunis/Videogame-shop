import React, {Component} from "react";
import AllGameCategories from '../Routes/GameCategories';
import '../App.css';

export class GameCategory extends Component{
    render(){
        return(
            <div>
                <AllGameCategories></AllGameCategories>
            </div>
        )
    }
}