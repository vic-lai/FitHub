import { Box, Grid2, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/")
    }
    return (
        <Box sx={{position:"absolute", top:0, left:0,width:"100%", backgroundColor:"#34abeb"}}>
            <Grid2 container size={12} sx={{ height:"80px", alignItems:"center"}}>
                <Grid2 size={6} container justifyContent="center">
                    <Typography sx={{fontSize:"30px", color:"white", borderStyle:"solid", paddingLeft:"40px", paddingRight:"40px", borderRadius:"40px",cursor: "pointer"}} onClick={handleClick}>FitHub</Typography>
                </Grid2>
                <Grid2 container justifyContent="space-around" size={4}>
                    <Grid2>
                        <Link to="/">
                            <Typography>Programs</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/create-program">
                            <Typography>Create</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/about">
                            <Typography>About</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/contact">
                            <Typography>Contact</Typography>
                        </Link>
                    </Grid2>
                <Grid2>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Box>
    );
}
 
export default Navbar;