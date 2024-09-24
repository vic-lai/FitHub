import { Box, Typography, Grid, Button, Grid2 } from "@mui/material";
import CreateExercise from "./CreateExercise";
import { useState } from "react";

const CreateDay = ({ day_num }) => {
    const [exercises, setExercises] = useState([]);
    const addExercise = () => {
        setExercises([...exercises, <CreateExercise key={exercises.length} />]);
    };
    const deleteLastExercise = () => {
        if (exercises.length > 0) { 
            setExercises(exercises.slice(0, -1)); 
        }
    };
    return (
        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: 1, margin: 1, width: '100%', flex: '1 0 30%' }}>
            <Typography variant="body1" gutterBottom>
                Day {day_num}
            </Typography>
            <CreateExercise />
            {exercises}
            <Grid2 size={12} container>
                <Grid2 size={6}>
                    <Button onClick={addExercise}>Add exercise</Button>
                </Grid2>
                <Grid2 size={6}>
                    <Button onClick={deleteLastExercise}>Delete exercise</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CreateDay;
