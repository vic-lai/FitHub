import { Box, Container, Grid2, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Program = () => {
    const location = useLocation();
    const { program } = location.state || {};
    console.log(program);

    return (
        <Container sx={{ marginTop: "100px" }}>
            {program.weeks?.map((week, index) => (
                <Box key={index} sx={{ mb: "40px" }}>
                    <Typography sx={{ fontSize: "22px", fontWeight: "bold", mb: "20px" }}>
                        Week {week.week}
                    </Typography>
                    <Grid2 container>
                        {week.workout.map((day) => (
                            <Grid2 size={1.7} container>
                                <Box key={day.day} sx={{ mb: "30px"}}>
                                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>{day.day}</Typography>
                                    <Grid2 container sx={{ gap: "50px", mb: "20px" }}>
                                        {day.exercises.map((exercise) => (
                                            <Grid2 item key={exercise.name}>
                                                <Typography>{exercise.name}</Typography>
                                                {exercise.sets ? (
                                                    <Typography>{exercise.sets}x{exercise.reps}</Typography>
                                                ) : (
                                                    <Typography>{exercise.duration}</Typography>
                                                )}
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </Box>
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
