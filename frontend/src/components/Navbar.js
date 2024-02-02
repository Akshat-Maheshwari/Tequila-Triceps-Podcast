import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Search from './Search';

export default function Navbar() {
  const {currentUser, logout}=useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate= useNavigate();
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAdminPanel=()=>{
    navigate('/addfile')
  }
  return (
    <Box sx={{ flexGrow: 1, "margin-bottom":"50px"}}>
      <AppBar position="static" sx={{boxShadow:'none',"background":"white" }}>
        <Toolbar sx={{justifyContent:'center'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{color:"grey","margin-right":"20px",display: { xs: 'none', sm: 'block' } }}
          >
            LOGO
          </Typography>
          <Search />
          {currentUser && (
            <div>
              <IconButton
                size="xl"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{"margin-left":"20px"}}
              >
                <AccountCircle sx={{width:"40px",height:"40px", color:"grey"}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAdminPanel}>Admin Panel</MenuItem>
                <MenuItem onClick={logout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}