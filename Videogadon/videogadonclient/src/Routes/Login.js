import React from "react";
import '../App.css';
import {useState} from "react";
import AuthUser from "../Services/AuthUser";
import { useNavigate } from 'react-router-dom';

function Login(){

    const navigate = useNavigate();
    const { http, setToken, getToken, } = AuthUser();

    const [usernameReq, setUsernameReq] = useState('')
    const [passwordReq, setPasswordReq] = useState('')

    const [isLoading, setLoading] = useState(false);

    const login = () => {
        if(isLoading)
            return;
        console.log(getToken());
        setLoading(true);
        console.log(usernameReq);
        console.log(passwordReq);

        http.post('/login', {
            userName: usernameReq,
            password: passwordReq
        }).then((res) => {
            
            console.log(res.data);
            console.log("User",usernameReq)
            console.log("Token", res.data.accessToken)
            setToken(usernameReq, res.data.accessToken);

        }).catch((error) => {
            alert("Bad login details");
            window.location.reload(false);  
            navigate('/login');
        })  
    };

    return(
        
        <div className="col-sm-6 offset-sm-3">
            <h1>Login page</h1>
            <label>Username</label>
            <input type = "text" value={usernameReq} onChange={(e)=>setUsernameReq(e.target.value)} className="form-control" placeholder="Username"/>
            <br></br>
            <label>Password</label>
            <input type = "password" value={passwordReq} onChange={(e)=>setPasswordReq(e.target.value)} className="form-control" placeholder="Password"/>
            <br></br>
            <button onClick={login} className="btn btn-primary">Log in</button>
        </div>

    );
}

export default Login;