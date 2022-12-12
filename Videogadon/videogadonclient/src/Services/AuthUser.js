import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('accessToken');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('userName');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        sessionStorage.setItem('accessToken', JSON.stringify(token));
        sessionStorage.setItem('userName', JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const http = axios.create({
        baseURL: "http://localhost:5001/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }

    });
    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout,
        getUser,
    }
}