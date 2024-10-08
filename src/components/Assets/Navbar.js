import { Box, Button, Grid2, IconButton, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({loggedIn, setLoggedIn}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);
    const isMobile = useMediaQuery('(max-width:730px)');
    const handleMenuOpen = (event) => {
        setOpen(event.currentTarget)
    }
    const handleMenuClose = () => {
        setOpen(null)
    }
    const handleClick = () => {
        navigate("/")
    }

    const logout = async () => {
        console.log('Logging out');
        try {
            await fetch('/logout', {
                method: 'POST', 
                credentials: 'include'
            });
            setLoggedIn(false); 
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
        
    }
    const checkLoginStatus = async () => {
        try {
            const response = await fetch('/getUser', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                setLoggedIn(true)
            } else {
                setLoggedIn(false); 
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setLoggedIn(false);
        };
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <Box sx={{position:"absolute", top:0, left:0,width:"100%", backgroundColor:"#34abeb",zIndex:2}}>
            <Grid2 container size={12} sx={{ height:"80px", alignItems:"center"}}>
                <Grid2 size={isMobile?10:5} container justifyContent="center" alignItems="center">
                    <img src={`${process.env.PUBLIC_URL}/favicon.ico`} style={{width:"90px", marginRight:"10px",cursor: "pointer"}} onClick={handleClick}></img>
                    <Typography sx={{fontSize:"40px", color:"white",cursor: "pointer", fontWeight:'bold'}} onClick={handleClick}>FitHub</Typography>
                </Grid2>
                {isMobile  ? (
                    <Grid2 container size={2} justifyContent="flex-end">
                        <Grid2>
                            <IconButton sx={{color:"white"}} onClick={handleMenuOpen}>
                                <MenuIcon />
                            </IconButton>
                            <Menu open={open} onClose={handleMenuClose} anchorEl={open} anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}>
                                <Link to="/programs">
                                    <MenuItem sx={{color:"black", width:'200px'}}>Programs</MenuItem>
                                </Link>
                                <Link to="/create-program">
                                    <MenuItem sx={{color:"black"}}>Create Program</MenuItem>
                                </Link>
                                <Link to="/contact">
                                    <MenuItem sx={{color:"black"}}>Contact</MenuItem>
                                </Link>
                                {loggedIn && 
                                <Link to="/">
                                    <MenuItem sx={{color:"black"}} onClick={logout}>Logout</MenuItem>
                                </Link>
                                }
                                {!loggedIn && 
                                <Link to="/login">
                                    <MenuItem sx={{color:"black"}}>Log In</MenuItem>
                                </Link>
                                }
                                {!loggedIn && 
                                <Link to="/signup">
                                    <MenuItem sx={{color:"black"}}>Sign Up</MenuItem>
                                </Link>
                                }
                            </Menu>
                        </Grid2>
                    </Grid2>
                ): (
                <Grid2 container justifyContent="space-around" size={4}>
                    <Grid2>
                        <Link to="/programs">
                            <Typography sx={{fontSize:"20px", '&:hover': {color:'gray'},}} >Programs</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/create-program">
                            <Typography sx={{fontSize:"20px", '&:hover': {color:'gray'},}}>Create</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/contact">
                            <Typography sx={{fontSize:"20px", '&:hover': {color:'gray'},}}>Contact</Typography>
                        </Link>
                    </Grid2>
                <Grid2>
                    </Grid2>
                </Grid2>
                )}
                {!isMobile && (
                    <Grid2 container size={3}>
                        {loggedIn ? (
                            <Grid2 size={12}>
                                <Link to="/" onClick={logout}>
                                    <Typography sx={{maxWidth:"100px", backgroundColor: "#303638", color: "white", textAlign: "center", borderRadius: "20px", padding: "5px", '&:hover': { color: 'gray' } }}>Log out</Typography>
                                </Link>
                            </Grid2>
                        ) : (
                            <>
                                <Grid2 size={6}>
                                    <Link to="/login">
                                        <Typography sx={{ maxWidth:"100px", backgroundColor: "#303638", color: "white", textAlign: "center", borderRadius: "20px", padding: "5px", '&:hover': { color: 'gray' } }}>Log in</Typography>
                                    </Link>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Link to="/signup">
                                        <Typography sx={{ maxWidth:"100px", backgroundColor: "#303638", color: "white", textAlign: "center", borderRadius: "20px", padding: "5px", '&:hover': { color: 'gray' } }}>Sign Up</Typography>
                                    </Link>
                                </Grid2>
                            </>
                        )}
                    </Grid2>
                )}
            </Grid2>
        </Box>
    );
}
 
export default Navbar;