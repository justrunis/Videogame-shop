import React from "react";
import {Link} from "react-router-dom";

function onClick() {
    console.log("clicked game");
}

export default function Game({ name, description, platform, releaseDate, price, id1, id2}) {

    return (
        <Link to={`/api/gameCategories/${id1}/game/${id2}`}>
            <div className="badges" onClick={onClick}>
                <div>
                    <p1 className="GameCategories-p1">{name}</p1>
                    <p className="GameCategories-p">{description}</p>
                    <p className="GameCategories-p">{platform}</p>
                    <p className="GameCategories-p">{releaseDate}</p>
                    <p className="GameCategories-p">{price}</p>
                </div>
            </div>
        </Link>
    );
}