import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('accessToken');
        const userToken = JSON.parse(tokenString);
        console.log(userToken);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('accessToken');
        const user_detail = JSON.parse(userString);
        //console.log(user_detail);
        return user_detail;
    }

    const [accessToken, setToken] = useState(getToken());
    const [userName, setUser] = useState(getUser());

    const saveToken = (userName, accessToken) => {
        sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
        sessionStorage.setItem('userName', JSON.stringify(userName));

        setToken(accessToken);
        setUser(userName);
        navigate('/home');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('http://localhost:5001/api/gameCateogires');
    }

    const http = axios.create({
        baseURL: "http://localhost:5001/api",
        headers: {
            "Accept":"application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }

    });
    return {
        setToken: saveToken,
        accessToken,
        userName,
        getToken,
        http,
        logout,
        getUser,
    }
}