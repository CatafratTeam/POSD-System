import React, { useEffect } from 'react';
import { API_URL } from "../constants";

export default function AdminArea(){

    useEffect(() => {
        console.log("diocan");
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if(data.username !== 'Admin1'){
                        window.location.href = '*';
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        } else {
            window.location.href = '*';
        }
    }, []);

    return (
        <div className="homePage">
            <h1>diocan</h1>
        </div>
    )
}