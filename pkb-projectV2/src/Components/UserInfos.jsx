import React, { useState, useEffect, useCallback } from 'react';
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
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { API_URL } from "../constants";
import { useDataFetching } from '../utils/dataFetching';

const style = {
    minWidth: 800,
    minHeight: 280,
    backgroundColor: 'rgba(0, 0, 0, 0.195)', // Semi-transparent background
    color: 'customTextColor.secondary',
    margin: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 0px 5px #fa1e4e',
    borderRadius: '10px',
    backdropFilter: 'blur(15px)', // Blur effect
    webkitBackdropFilter: 'blur(15px)' // For Safari support
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 15px #fa1e4e',
    borderRadius: '10px',
    p: 4,
    color: '#ffffff',
    width: '100vh',
    height: '60vh',
    overflowY: 'auto',
    backdropFilter: 'blur(15px)',
    webkitBackdropFilter: 'blur(15px)',
    backgroundColor: 'transparent'
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

export default function UserCard() {
    const [user, setUser] = useState({ username: "", email: "", createdAt: "" });
    const [isPasswordFieldEnabled, setIsPasswordFieldEnabled] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [selectedFavorite, setSelectedFavorite] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const { data: logData, error } = useDataFetching(`${API_URL}/logs?filters[username][$eq]=${user.username}`);

    useEffect(() => {
        if (logData) {
            setLogs(logData.data.map(log => ({
                username: log.attributes.username,
                query: log.attributes.Query,
                createdAt: formatDate(log.attributes.createdAt)
            })));
            setIsLoading(false);
        }
    }, [logData]);

    const fetchFavorites = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get(`${API_URL}/preferitis?filters[username][$eq]=${user.username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setFavorites(response.data.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        }
    }, [user.username]);

    useEffect(() => {
        if (user.username) {
            fetchFavorites();
        }
    }, [user.username, fetchFavorites]);

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

    const handleFavoriteClick = (favorite) => {
        setSelectedFavorite(favorite);
        setModalOpen(true);
    };

    const handleFavoriteDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await axios.delete(`${API_URL}/preferitis/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                fetchFavorites();
                setModalOpen(false);
            } catch (error) {
                console.error('Error deleting favorite:', error);
            }
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '100vh',
            flexDirection: 'column',
            boxSizing: 'border-box',
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
            {isLoading ? (
                <Typography>Loading...</Typography>
            ) : error ? (
                <Typography>Error: {error.message}</Typography>
            ) : (
                <Box
                    sx={{
                        minWidth: 800,
                        minHeight: 280,
                        backgroundColor: 'rgba(0, 0, 0, 0.195)',
                        color: '#e7edf1',
                        margin: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: '0px 0px 15px #000000',
                        borderRadius: '10px',
                        maxHeight: 400,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                    }}
                >
                    <TableContainer component={Paper} sx={{ flexGrow: 1, overflowY: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.195)' }}>
                        <Table sx={{ minWidth: '70vh' }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'transparent', borderBottom: '1px solid #3a3544' }}>
                                    <TableCell sx={{ color: '#fa1e4e', fontSize: 20 }}>Username</TableCell>
                                    <TableCell align="left" sx={{ color: '#fa1e4e', fontSize: 20 }}>Query</TableCell>
                                    <TableCell align="left" sx={{ color: '#fa1e4e', fontSize: 20 }}>Search Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs.map((log, index) => (
                                    <TableRow key={index} sx={{ backgroundColor: 'transparent', borderBottom: '1px solid #3a3544' }}>
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
            <Typography color="customTextColor.main" fontSize='2em'>[ Favorites ]</Typography >
            <Grid container spacing={2} justifyContent="center" marginTop={2}>
                {favorites.map(favorite => (
                    <Grid item key={favorite.id} xs={12} style={{ marginBottom: '1rem' }}>
                        <Card
                            sx={{
                                width: '100%',
                                height: 'auto',
                                backgroundColor: 'rgba(0, 0, 0, 0.195)',
                                color: '#e7edf1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                boxShadow: '0px 0px 5px #fa1e4e',
                                borderRadius: '10px',
                                backdropFilter: 'blur(15px)',
                                WebkitBackdropFilter: 'blur(15px)',
                                padding: '1rem',
                            }}
                            onClick={() => handleFavoriteClick(favorite)}
                        >
                            <Typography
                                sx={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign: 'center',
                                }}
                            >
                                {favorite.attributes.Name}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>



            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    {selectedFavorite && (
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: 'customTextColor.main' }}>
                                {selectedFavorite.attributes.Name}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedFavorite.attributes.Description}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedFavorite.attributes.Context}
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                {selectedFavorite.attributes.Example}
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={() => handleFavoriteDelete(selectedFavorite.id)}
                                sx={{
                                    backgroundColor: '#fa1e4e',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#d0173c',
                                    },
                                    marginTop: 2
                                }}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
