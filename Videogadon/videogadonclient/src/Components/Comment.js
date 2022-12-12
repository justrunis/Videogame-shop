import React from "react";
import {Link} from "react-router-dom";
import '../Routes/Posts.css';

function onClick() {
    console.log("clicked comment");
}

export default function Comment({content,id1,id2,id3}) {

    return (
        <Link to={`/api/gameCategories/${id1}/game/${id2}/comments/${id3}`}>
            <div className="badges" onClick={onClick}>
                <div>
                    <p1 className="GameCategories-p">{content}</p1>
                </div>
            </div>
        </Link>
    );
}