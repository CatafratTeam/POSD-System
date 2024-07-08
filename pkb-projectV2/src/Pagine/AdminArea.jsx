import React, { useState, useEffect } from 'react';
import { API_URL } from "../constants";
import AdminAppBar from '../Components/AdminAppBar';
import MainContainer from '../Components/MainContainerAdminArea';

export default function AdminArea() {
    const [selectedButtonValue, setSelectedButtonValue] = useState('articoli-gdprs');

    useEffect(() => {
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
                    if (data.username !== 'Admin1') {
                        window.location.href = '*';
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        } else {
            window.location.href = '*';
        }
    }, []);

    const handleButtonClick = (value) => {
        setSelectedButtonValue(value);
    };

    return (
        <div className="homePage">
            <AdminAppBar onButtonClick={handleButtonClick} initialButtonValue={selectedButtonValue} />
            <MainContainer selectedButtonValue={selectedButtonValue} />
        </div>
    );
}
