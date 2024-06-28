import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { API_URL } from "../constants";
import { useQuery, gql } from '@apollo/client';

const style = {
    minWidth: 800,
    minHeight: 280,
    backgroundColor: 'secondary.main',
    color: 'customTextColor.secondary',
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 5px #fa1e4e',
    borderRadius: '10px',
};


const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'customTextColor.secondary',
        },
        '&:hover fieldset': {
            borderColor: 'customTextColor.secondary',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'customTextColor.secondary',
        },
        '& input': {
            color: 'customTextColor.secondary',
            height: '3.5rem',
            fontSize: '1rem',
            padding: '10px 14px',
            boxSizing: 'border-box',
        },
    },
    '& .MuiInputLabel-outlined': {
        color: 'customTextColor.secondary',
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
        color: 'customTextColor.secondary',
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
        '& fieldset': {
            borderColor: 'customTextColor.faded',
        },
        '& input': {
            color: 'customTextColor.faded',
        },
    },
    '& .MuiInputLabel-outlined.Mui-disabled': {
        color: 'customTextColor.faded',
    },
};

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return date.toLocaleString('it-IT', options);
}

const GET_LOGS = gql`
    query ($value: String!) {
        logs(filters: { username: { eq: $value } }) {
            data {
                attributes {
                    username
                    Query
                    createdAt
                }
            }
        }
    }`;

export default function UserCard() {
    const [user, setUser] = useState({ username: "", email: "", createdAt: "" });
    const [isPasswordFieldEnabled, setIsPasswordFieldEnabled] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [logs, setLogs] = useState([]);

    const { loading, error, data } = useQuery(GET_LOGS, {
        variables: { value: user.username },
        skip: !user.username
    });
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
                    setUser(data);
                    console.log(data);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    useEffect(() => {
        if (data) {
            setLogs(data.logs.data.map(log => ({
                username: log.attributes.username,
                query: log.attributes.Query,
                createdAt: formatDate(log.attributes.createdAt)
            })));
        }
    }, [data]);


    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleButtonClick = async () => {
        if (isPasswordFieldEnabled && newPassword === '') {
            setIsPasswordFieldEnabled(false);
        } else if (!isPasswordFieldEnabled) {
            setIsPasswordFieldEnabled(true);
        } else {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${API_URL}/auth/change-password`, {
                    currentPassword: currentPassword,
                    password: newPassword,
                    passwordConfirmation: newPassword
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("Password change: ", response.data);
                setCurrentPassword('');
                setNewPassword('');
                setIsPasswordFieldEnabled(false);
            } catch (error) {
                console.error("Error changing password: ", error);
            }
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '60vh',
            flexDirection: 'column',
            boxSizing: 'border-box'
        }}>
            <Typography color="customTextColor.main" fontSize='2em'>[ User Info ]</Typography >
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Card sx={style}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, padding: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="0.7em">
                                    Username
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='10%' paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="0.7em">
                                    E-mail
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='10%' paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="0.7em">
                                    Created at
                                </Typography>
                                <Typography component="span" color="customTextColor.main" fontSize="1em" paddingRight='10%' paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            <Button
                                sx={{
                                    '&:hover': { boxShadow: '0px 0px 15px #fa1e4e' },
                                    border: '1px solid #fa1e4e',
                                    padding: 1.5,
                                    borderRadius: "10px",
                                    width: '70%'
                                }}
                                onClick={handleButtonClick}
                            >
                                <Typography color="customTextColor.secondary">
                                    {isPasswordFieldEnabled && newPassword !== '' ? 'Save' : 'Change Password'}
                                </Typography>
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="0.7em">
                                    {user.username}
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="0.7em">
                                    {user.email}
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingRight='2%'>
                                    [
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="0.7em">
                                    {formatDate(user.createdAt)}
                                </Typography>
                                <Typography component="span" color="customTextColor.secondary" fontSize="1em" paddingLeft='2%'>
                                    ]
                                </Typography>
                            </Box>
                            {isPasswordFieldEnabled && (
                                <TextField
                                    label="Current Password"
                                    placeholder='**********'
                                    type="password"
                                    value={currentPassword}
                                    onChange={handleCurrentPasswordChange}
                                    sx={{
                                        width: "70%",
                                        ...textFieldStyle,
                                    }}
                                />
                            )}
                            <TextField
                                label="New Password"
                                placeholder='**********'
                                type="password"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                disabled={!isPasswordFieldEnabled}
                                sx={{
                                    width: "70%",
                                    ...textFieldStyle,
                                }}
                            />
                        </Box>
                    </Box>
                </Card>
            </Box>
            <Typography color="customTextColor.main" fontSize='2em'>[ Logs ]</Typography >
            {loading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>Error: {error.message}</Typography>
            ) : (
                <Box sx={{
                    minWidth: 800,
                    minHeight: 280,
                    backgroundColor: '#1b1724',
                    color: '#e7edf1',
                    margin: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0px 0px 15px #00000',
                    borderRadius: '10px',
                    maxHeight: 400
                }}>
                    <TableContainer component={Paper} sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: '#1b1724' }}>
                        <Table sx={{ minWidth: '70vh' }} aria-label="simple table">
                            <TableHead>
                            <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: 'secondary.main' }, '&:nth-of-type(even)': { backgroundColor: '#1b1724' }, borderBottom: '1px solid #3a3544' }}>
                                    <TableCell sx={{ color: '#fa1e4e', fontSize: 20 }}>Username</TableCell>
                                    <TableCell align="left" sx={{ color: '#fa1e4e', fontSize: 20 }}>Query</TableCell>
                                    <TableCell align="left" sx={{ color: '#fa1e4e'}}>Search Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs.map((log, index) => (
                                    <TableRow key={index} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'secondary.main' }, '&:nth-of-type(even)': { backgroundColor: '#1b1724' }, borderBottom: '1px solid #3a3544' }}>
                                        <TableCell component="th" scope="row" sx={{ color: '#e7edf1', borderBottom: 'none' }}>
                                            {log.username}
                                        </TableCell>
                                        <TableCell align="left" sx={{ color: '#e7edf1', borderBottom: 'none' }}>{log.query}</TableCell>
                                        <TableCell align="left" sx={{ color: '#e7edf1', borderBottom: 'none' }}>{log.createdAt}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                
            )}
        </Box>
    );
}
