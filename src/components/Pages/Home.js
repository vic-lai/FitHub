import { Box, Container, Typography } from "@mui/material";
import background from '../Assets/images/background.jpg'

const Home = () => {
    return (
        <Box sx={{width:"100%", backgroundImage:`url(${background})`,height:"100vh", backgroundSize:'cover',backgroundPosition:'center', position:"absolute", top:0, display:'flex',flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
            <Box
                sx={{position: 'absolute',top: 0,left: 0,right: 0,bottom: 0, backgroundColor: 'rgba(64, 64, 64, .5)',zIndex:1}}
            />
            <Typography sx={{color:"white", fontSize:"100px", fontWeight:'bold', textAlign:'center', position:'relative',zIndex:2}}>
                FitHub
            </Typography>
            <Typography sx={{color:"white", fontSize:"50px", textAlign:'center',position:'relative',zIndex:2}}>
                Find the perfect program or create your own today!
            </Typography>
        </Box>
    );
}
 
export default Home;