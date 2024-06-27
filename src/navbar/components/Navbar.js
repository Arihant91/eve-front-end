import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'; // Import Box for spacing


function Navbar() {
    return (
        <AppBar position="static" sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Eve online
                </Typography>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Button color="inherit" size="medium" component={Link} to="/" >Home</Button>
                    <div style={{ borderLeft: '1px solid white', height: '25px' }}></div>
                    <Button color="inherit" size="medium" component={Link} to="/market" >Market</Button>
                    <div style={{ borderLeft: '1px solid white', height: '25px' }}></div>
                    <Button color="inherit" size="medium" component={Link} to="/graphs">Graphs</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;