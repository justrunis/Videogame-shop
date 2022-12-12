import React, {Component} from "react";
import '../App.css';
import AllGameCategories from "../Routes/GameCategories";

export class Home extends Component{
    render(){
        return(
            <div>
                <AllGameCategories></AllGameCategories>
            </div>
        )
    }
}