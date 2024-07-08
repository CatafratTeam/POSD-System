import React, { useEffect, useState, useCallback } from 'react';
import {
  AppBar, Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Modal
} from '@mui/material';
import { AccountCircle, NotificationsOutlined as NotificationsOutlinedIcon, CloseOutlined as CloseOutlinedIcon } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { API_URL } from "../constants";
import { useDataFetching } from "../utils/dataFetching";
import SideBar from "./SideBar";
import CenteredDrawer from "./RegisterLoginDrawer";
import "../css/toastStyle.css";
import { useLocation } from 'react-router-dom';

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

export default function ButtonAppBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginNotified, setLoginNotified] = useState(false);
  const [anchorElAccount, setAnchorElAccount] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [username, setUsername] = useState("");
  const [notif, setNotif] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const location = useLocation();

  const { data: dataNotify, error: errorNotify } = useDataFetching(`${API_URL}/notifications`);
  if (errorNotify) {
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
    toast.dark("Login successfully", {
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
          if (data.username === 'Admin1') {
            setIsAdmin(true);
          }
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
    window.location.href = '/';
  };

  const handleNotificationClick = (notification) => {
    const { updatedAt, publishedAt, id, ...filteredNotification } = notification.attributes;
    filteredNotification.createdAt = formatDate(filteredNotification.createdAt);
  
    const content = Object.entries(filteredNotification)
      .map(([key, value]) => `${value}`)
      .join('<br/> <br/>');
  
    console.log('Notification clicked:', filteredNotification);
    setSelectedContent(content);
    setModalOpen(true);
    handleClose();
  };  
  

  const handleModalClose = () => {
    setModalOpen(false);
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
    width: '70vh',
    maxHeight: '60vh',
    overflowY: 'auto',
    backdropFilter: 'blur(15px)', 
    webkitBackdropFilter: 'blur(15px)', 
    backgroundColor: 'transparent'
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ height: "12vh", backdropFilter: 'blur(15px)', webkitBackdropFilter: 'blur(15px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
                  onClick={() => handleNotificationClick(notification)}
                >
                  <Typography>Notifica: </Typography>{formatDate(notification.attributes.createdAt)}
                </MenuItem>
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
                  {isAdmin &&
                    <Link to="/AdminArea" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <MenuItem
                        sx={{
                          backgroundColor: 'primary.main',
                          color: 'customTextColor.secondary',
                          '&:hover': {
                            backgroundColor: '#262032',
                            color: 'customTextColor.secondary',
                          },
                        }}
                      >AdminArea</MenuItem>
                    </Link>
                  }
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
                  {location.pathname === '/UserArea' &&
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
                  </Link>}
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
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleModalClose}
            sx={{ position: 'absolute', top: 8, right: 8, color: '#ffffff' }}
          >
            <CloseOutlinedIcon />
          </IconButton>
          <Typography id="modal-title" variant="h4" component="h4" color="customTextColor.main" sx={{ paddingBottom: 1 }}>
            Details
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html: selectedContent }} />
        </Box>
      </Modal>
    </Box>
  );
}
