import { Box, Container, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Program = () => {
    const location = useLocation();
    const { program } = location.state || {};
    const [programData, setProgramData] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:3300/workoutprograms/${program.p_id}`)
          .then(res=>res.json())
          .then(data => setProgramData(data))
          .catch(err=> console.log(err));
      },[])

    useEffect(()=> {
        console.log(programData)
    },[programData])

    return (
        <Container sx={{ marginTop: "100px" }}>
            {programData.weeks?.map((week)=> (
                <Box sx={{borderStyle:"solid", padding:"20px", borderColor:"white", borderWidth:"2px"}}>
                    <Typography sx={{fontSize:"24px", fontWeight:"bold", mb:"20px"}}>Week {week.week_number}</Typography>
                    <Grid2 container>
                        {week.days?.map((day)=> (
                            <Grid2 size={1.7} container sx={{flexDirection:'column', mb:"40px"}}>
                                <Typography sx={{fontSize:"20px"}}>{day.day}</Typography>
                                <Grid2 container sx={{flexDirection:"column"}}>
                                    {day.exercises?.map((exercise)=> (
                                        <Typography>{exercise.exercise}: {exercise.num_sets}x{exercise.reps}</Typography>
                                    ))}
                                </Grid2>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            ))}

            <Typography sx={{ fontSize: "18px", mt: "30px" }}>Author: {program.author}</Typography>
        </Container>
    );
};

export default Program;
