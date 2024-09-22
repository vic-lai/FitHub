import { Box, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Box sx={{position:"fixed", top:0, left:0,width:"100%", backgroundColor:"#379451"}}>
            <Grid2 container size={12} sx={{ height:"80px", alignItems:"center"}}>
                <Grid2 size={1} container justifyContent="flex-end">
                    <Typography>FitHub</Typography>
                </Grid2>
                <Grid2 container justifyContent="flex-end" size={8} sx={{gap:"10%"}}>
                    <Grid2>
                        <Link to="/">
                            <Typography>Home</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/">
                            <Typography>Home</Typography>
                        </Link>
                    </Grid2>
                    <Grid2>
                        <Link to="/about">
                            <Typography>About</Typography>
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