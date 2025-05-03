import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { pageRoutes } from "./page";
import { Link } from "react-router";
import { useState } from "react";
// navigation menu bar
export default function Navbar(){
   const routes=pageRoutes.filter((url)=>url.show===true).sort((url)=>url.order);
   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
 
   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
     setAnchorElNav(event.currentTarget);
   };
 
   const handleCloseNavMenu = () => {
     setAnchorElNav(null);
   };

   const renderMobileMenu=()=>{
    return <Menu id="menu-appbar"
    anchorEl={anchorElNav}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={Boolean(anchorElNav)}
    onClose={handleCloseNavMenu}
    sx={{ display: { xs: 'block', md: 'none' } }}>
    {
    routes.map((route,key)=>(
        <Link to={route.url}>
        <MenuItem key={key}>
        <Typography sx={{ textAlign: 'center' }}>
        {route.name}
        </Typography>
        </MenuItem>
        </Link>
    ))
    }
    </Menu>;
   }
    return (
        <div>
        <AppBar position="static">
        <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
        >
        <MenuIcon/>
        </IconButton>
        {
            renderMobileMenu()
        }
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((route,key) => (
              <Link to={route.url}>
              <Button
                key={key}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block',fontWeight:'800' }}
              >
                {route.name}
              </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
        </Container>
        </AppBar>
        </div>
    );
}