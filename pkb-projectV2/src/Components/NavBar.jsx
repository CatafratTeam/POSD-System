import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import SideBar from "./SideBar";
import CenteredDrawer from "./RegisterLoginDrawer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useCallback } from "react";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Link } from 'react-router-dom';
import { API_URL } from "../constants";
import { useDataFetching } from "../utils/dataFetching";
import "../css/toastStyle.css";

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginNotified, setLoginNotified] = useState(false);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [username, setUsername] = useState("");
  const [notif, setNotif] = useState([]);

  const { data: dataNotify, error: errorNotify } = useDataFetching(`${API_URL}/notifications`);
  if(errorNotify){
    console.log("Unexpected error");
  }

  useEffect(() => {
    if (dataNotify) {
      setNotif(dataNotify.data);
    }
  }, [dataNotify]);

  const handleMenuAccount = (event) => {
    setAnchorElNotif(null);
    setAnchorElAccount(event.currentTarget);
  };

  const handleMenuNotif = (event) => {
    setAnchorElAccount(null);
    setAnchorElNotif(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAccount(null);
    setAnchorElNotif(null);
  };

  const NotifyLogin = useCallback(() => {
    toast.dark("Login succesfully", {
      position: "bottom-right",
      autoClose: 2000,
      className: 'toast-custom-style',
      closeOnClick: true,
    });
  }, []);

  const NotifyLogout = useCallback(() => {
    toast.dark("Logout successfully", {
      position: "bottom-right",
      autoClose: 2000,
      className: 'toast-custom-style',
      closeOnClick: true,
    });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
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
    if (isLoggedIn && !loginNotified) {
      NotifyLogin();
      setLoginNotified(true);
    }
  }, [isLoggedIn, loginNotified, NotifyLogin]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setLoginNotified(false);
    NotifyLogout();
    console.log('Logged out');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: "12vh", opacity: 1 }}>
        <Toolbar sx={{ height: "100%", alignItems: 'center' }}>
          <SideBar />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: "customTextColor.main" }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}><b>CatafratTeam</b></Link>
          </Typography>
          <>
            <IconButton
              size='large'
              aria-label="notifications"
              aria-controls="menu-notifications"
              aria-haspopup="true"
              color='inherit'
              onClick={handleMenuNotif}
              sx={{
                padding: 3
              }}
            >
              <NotificationsOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-notifications"
              anchorEl={anchorElNotif}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNotif)}
              onClose={handleClose}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'primary.main',
                  color: 'customTextColor.secondary',
                  border: "1px solid #fff"
                },
              }}>
              {notif.length > 0 ? notif.map((notification, index) => (
                <MenuItem
                  key={index}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'customTextColor.secondary',
                    '&:hover': {
                      backgroundColor: '#262032',
                      color: 'customTextColor.secondary',
                    },
                  }}
                >{notification.attributes.message}</MenuItem>
              )) : (
                <MenuItem
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'customTextColor.secondary',
                    '&:hover': {
                      backgroundColor: '#262032',
                      color: 'customTextColor.secondary',
                    },
                  }}
                >No new notifications</MenuItem>
              )}
            </Menu>
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <Button color="inherit" onClick={handleDrawerOpen} sx={{ '&:hover': { boxShadow: '0px 0px 15px #fa1e4e' }, border: '1px solid #fa1e4e', padding: 1.5, borderRadius: "10px" }}>
                <PersonIcon />Login
              </Button>
            )}
          </>
        </Toolbar>
      </AppBar>
      <CenteredDrawer open={drawerOpen} handleClose={handleDrawerClose} />
      <ToastContainer />
    </Box>
  );
}
