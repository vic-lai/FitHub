import { Accordion, AccordionSummary, AccordionDetails, Box, Container, Grid2, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import axios from "axios";

const ProgramList = () => {
    const navigate = useNavigate();
    
    const handleClick = (program) => {
        const formattedTitle = program.title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/program/${formattedTitle}`, {state: {program}})
    }

    const [workoutPrograms, setWorkoutPrograms] = useState([]);

    useEffect(()=> {
        axios.get('/workoutprograms')
          .then((res) => {
            setWorkoutPrograms(res.data);
            console.log(res.data);
            })
          .catch(err=> console.log(err));
      },[])

    return (
        <Container sx={{ marginTop: "100px", backgroundColor:"gray", padding:"50px", borderRadius:"20px" }}>
            {workoutPrograms.map(program => (
                <Accordion key={program.p_id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid2 container size={12}>
                            <Grid2 size={6} container justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ fontWeight: "bold", fontSize: "25px",'&:hover': {
                                    color:"#34abeb"
                                }}} onClick={()=>handleClick(program)} variant="h1">{program.title}</Typography>
                            </Grid2>
                            <Grid2 size={5} container justifyContent="flex-end">
                            <Typography sx={{color:'black'}}>Likes: {program.likes}</Typography>
                            </Grid2>
                        </Grid2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid2 container size={12}>
                            <Grid2 size={6} container>
                                <Typography sx={{color:"black"}}>Type: {program.p_type} </Typography>
                            </Grid2>
                            <Grid2 size={6} container justifyContent="flex-start">
                                <Typography sx={{color:"black"}}> Author: {program.author}</Typography>
                            </Grid2>
                        </Grid2>
                        <Grid2 container size={12}>
                        <Grid2 size={6} container>
                                <Typography sx={{color:"black"}}>Number of weeks: {program.num_weeks} </Typography>
                            </Grid2>
                            <Grid2 size={6} container justifyContent="flex-start">
                                <Typography sx={{color:"black"}}>Days a week: {program.days_per_week}</Typography>
                            </Grid2>
                        </Grid2>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}

export default ProgramList;
