import { Box, Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Program = () => {
    const location = useLocation();
    const { program } = location.state || {};
    const [programData, setProgramData] = useState([])

    useEffect(()=> {
        axios.get(`/workoutprograms/${program.p_id}`)
          .then((res) => {
            const groupedData = Object.values(res.data.reduce((acc, detail) => {
                const { week_number, day_number, exercise, num_sets, reps } = detail;
                if (!acc[week_number]) {
                    acc[week_number] = {
                        week_number,
                        days: []
                    };
                }
                const dayExists = acc[week_number].days.find(day => day.day_number === day_number);
                if (!dayExists) {
                    acc[week_number].days.push({
                        day_number,
                        exercises: []
                    });
                }
                acc[week_number].days.find(day => day.day_number === day_number).exercises.push({
                    exercise,
                    num_sets,
                    reps
                });
                return acc;
            }, {}));

            setProgramData(groupedData);
            console.log('Grouped Data:', groupedData);
        })
        .catch(err => console.log(err));
}, []);
    

    return (
        <Container sx={{ marginTop: "100px"}}>
            {programData?.map((week)=> (
                <Box sx={{borderStyle:"solid", padding:"20px", borderColor:"white", borderWidth:"2px"}}>
                    <Typography sx={{fontSize:"24px", fontWeight:"bold", mb:"20px", color:"white"}}>Week {week.week_number}</Typography>
                    <Grid2 container>
                        {week.days?.map((day)=> (
                            <Grid2 size={1.7} container sx={{flexDirection:'column', mb:"40px"}}>
                                <Typography sx={{fontSize:"20px", color:"white"}}>Day {day.day_number}</Typography>
                                <Grid2 container sx={{flexDirection:"column"}}>
                                    {day.exercises?.map((exercise)=> (
                                        <Typography sx={{color:"white"}}>{exercise.exercise}: {exercise.num_sets}x{exercise.reps}</Typography>
                                    ))}
                                </Grid2>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            ))}
            <Typography sx={{ fontSize: "18px", mt: "30px",color:"white"}}>Author: {program.author}</Typography>
        </Container>
    );
};

export default Program;
