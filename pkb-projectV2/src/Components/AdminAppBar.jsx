import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { API_URL } from "../constants";

export default function AdminAppBar({ onButtonClick, initialButtonValue }) {
    const [anchorElAccount, setAnchorElAccount] = useState(null);
    const [username, setUsername] = useState('');
    const [activeButton, setActiveButton] = useState(initialButtonValue);

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
                    setUsername(data.username);
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    useEffect(() => {
        if (initialButtonValue) {
            setActiveButton(initialButtonValue);
            onButtonClick(initialButtonValue);
        }
    }, [initialButtonValue, onButtonClick]);

    const handleMenuAccount = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElAccount(null);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.removeItem('token');
        console.log('Logged out');
        window.location.href = '/';
    };

    const buttons = [
        { label: 'GDPRArticles', value: 'articoli-gdprs' },
        { label: 'ISOs', value: 'isos' },
        { label: 'CWEs', value: 'cwes' },
        { label: 'MVCs', value: 'mvcs' },
        { label: 'OWASPs', value: 'owasps' },
        { label: 'Patterns', value: 'patterns' },
        { label: 'PBDs', value: 'pbds' },
        { label: 'Strategies', value: 'strategies' },
        { label: 'Users', value: 'users' },
        { label: 'Notifications', value: 'notifications' }
    ];

    const handleButtonClick = (value) => {
        setActiveButton(value);
        onButtonClick(value);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ height: "20vh", backdropFilter: 'blur(15px)', webkitBackdropFilter: 'blur(15px)', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: "customTextColor.main" }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><b>CatafratTeam</b></Link>
                    </Typography>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-account"
                            aria-haspopup="true"
                            onClick={handleMenuAccount}
                            color="inherit"
                            sx={{ '&:hover': { boxShadow: '0px 0px 15px #fa1e4e' }, border: '1px solid #fa1e4e', padding: 1.5, borderRadius: "10px" }}>
                            <AccountCircle />
                            <Typography sx={{ marginRight: 0, paddingLeft: 2 }}>{username}</Typography>
                        </IconButton>
                        <Menu
                            id="menu-account"
                            anchorEl={anchorElAccount}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElAccount)}
                            onClose={handleClose}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: 'primary.main',
                                    color: 'customTextColor.secondary',
                                    border: "1px solid #fff"
                                },
                            }}>
                            <Link to="/UserArea" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem
                                    sx={{
                                        backgroundColor: 'primary.main',
                                        color: 'customTextColor.secondary',
                                        '&:hover': {
                                            backgroundColor: '#262032',
                                            color: 'customTextColor.secondary',
                                        },
                                    }}
                                >My Account</MenuItem>
                            </Link>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MenuItem sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'customTextColor.secondary',
                                    '&:hover': {
                                        backgroundColor: '#262032',
                                        color: 'customTextColor.secondary',
                                    },
                                }}
                                    onClick={handleLogout}>Logout</MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Toolbar>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                        {buttons.map((button) => (
                            <Button
                                key={button.value}
                                sx={{
                                    color: 'white',
                                    mx: 1,
                                    position: 'relative',
                                    '&:after': {
                                        content: '""',
                                        display: 'block',
                                        width: activeButton === button.value ? '100%' : 0,
                                        height: '2px',
                                        background: 'red',
                                        transition: 'width 0.3s',
                                        position: 'absolute',
                                        bottom: -4,
                                        left: 0
                                    },
                                }}
                                onClick={() => handleButtonClick(button.value)}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
