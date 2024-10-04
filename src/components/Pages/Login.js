import { Button, Container, Grid2, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

const Login = () => {
    const onSubmit = data => {
        console.log(data)
    }
    const {register, handleSubmit} = useForm({});
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container sx={{ marginTop: "150px", backgroundColor: "gray", borderRadius:'20px', width:"30%" }}>
                <Grid2 container sx={{marginLeft:"10%", marginRight:"10%"}}>
                    <Grid2 size={12} container justifyContent="center" sx={{marginTop:'20px'}}>
                        <Typography sx={{fontSize:"30px", color:"white"}}>Login</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography sx={{color:"white"}}>Your Email</Typography>
                        <TextField required {...register("email")} autoComplete="off" type="email" sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:"white", mb:"20px"}}/>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography sx={{color:"white"}}>Password</Typography>
                        <TextField required type="password" {...register("password")} autoComplete="off" sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:"white", mb:"20px"}}/>
                    </Grid2>
                </Grid2>
                <Grid2 container justifyContent="center" sx={{paddingBottom:"50px"}}>
                    <Button type="submit" variant="contained" sx={{backgroundColor:"#34abeb"}}>Login</Button>
                </Grid2>
            </Container>
        </form>
    );
}
 
export default Login;