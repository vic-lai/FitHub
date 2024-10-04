import { Button, Container, Dialog, DialogTitle, Grid2, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
    const onSubmit = data => {
        console.log(data)
        axios.post('http://localhost:3300/sendEmail', {data: data})
            .then(res => {
                console.log("email sent");
                setOpen(true)
            })
            .catch(err => {
                console.log(err);
            })
    }
    const {register, handleSubmit} = useForm({
        defaultValues: {
            name:'',
            email:'',
            message:''
        }
    });

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container sx={{ marginTop: "150px", backgroundColor: "gray", borderRadius:'20px' }}>
                <Grid2 container sx={{marginLeft:"10%", marginRight:"10%"}}>
                    <Grid2 size={12} container justifyContent="center" sx={{marginTop:'20px'}}>
                        <Typography sx={{fontSize:"30px", color:"white"}}>Contact Me</Typography>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography sx={{color:"white"}}>Your Name</Typography>
                        <TextField {...register("name")} autoComplete="off" required sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:"white", mb:"20px"}}/>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography sx={{color:"white"}}>Your Email</Typography>
                        <TextField required {...register("email")} autoComplete="off" type="email" sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:"white", mb:"20px"}}/>
                    </Grid2>
                    <Grid2 size={12}>
                        <Typography sx={{color:"white"}}>Message</Typography>
                        <TextField required {...register("message")} multiline rows={10} autoComplete="off" type="email" sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:"white", mb:"20px"}}/>
                    </Grid2>
                </Grid2>
                <Grid2 container justifyContent="center" sx={{paddingBottom:"50px"}}>
                    <Button type="submit" variant="contained" sx={{backgroundColor:"#34abeb"}}>Submit</Button>
                </Grid2>
            </Container>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Message has been sent.
                </DialogTitle>
                <Grid2 container justifyContent="center" sx={{paddingBottom:"30px"}}>
                    <Button onClick={handleClose} variant="contained"  sx={{backgroundColor:"#34abeb", width:'50%'}}>Okay</Button>
                </Grid2>
            </Dialog>
        </form>
    );
}
 
export default Contact;