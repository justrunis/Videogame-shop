import React from "react";
import { Link } from "react-router-dom";


function onClick(){
    console.log("clicked game category");
}

export default function gameCategory({id1, name, description}){

    return(
        <Link to={`api/gameCategories/${id1}`}>
            <div className="badges" onClick={onClick}>
                <div>
                    <p1 className="GameCategories-p1">{name}</p1>
                    <p className="GameCategories-p">{description}</p>
                </div>
            </div>
        </Link>
    );
}