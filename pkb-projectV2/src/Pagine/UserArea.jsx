import AppBar from "../Components/NavBar";
import MainContainer from "../Components/MainContainerUserArea";
import React, { useEffect } from 'react';

export default function UserArea(){

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '*';
        }
    }, []);

    return (
        <div className="homePage">
            <AppBar/>
            <MainContainer/>
        </div>
    )
}