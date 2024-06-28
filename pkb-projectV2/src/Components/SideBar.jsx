import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ContentPage from './AccordionSideBar';
import '../css/index.css';


export default function SideBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const drawerStyle = {
    width: 250,
    height: '100%',
    overflowY: 'auto',
    backgroundColor: 'primary.main',
    color: '#ffffff',
    padding: 1,
    borderRight: 'solid 1px #fa1e4e',
    boxShadow: '0px 0px 15px #fa1e4e'
  };

  const DrawerList = (
    <Box sx={drawerStyle} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 4 }}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: "customTextColor.main" }}>
          <b>Menu</b>
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{ color: '#ffffff', '&:hover': { color: 'customTextColor.main' } }}>
          <ChevronLeftIcon sx={{ color: "customTextColor.main" }} />
        </IconButton>
      </Box>
      <List>
        <ListItem
          disablePadding
          sx={{
            transition: 'color 0.3s',
            '&:hover': {
              color: 'customTextColor.main',
              '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                color: 'customTextColor.main'
              }
            }
          }}
        > <ContentPage />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </Box>
  );
}
