import {Grid2, TextField } from "@mui/material";

const CreateExercise = () => {
    return (
        <Grid2 container spacing={2} sx={{mb:"20px"}}>
            <Grid2 size={12}>
                <TextField
                    label="Exercise"
                    variant="outlined"
                    fullWidth
                />
            </Grid2>
            <Grid2 size={6}>
                <TextField
                    label="Sets"
                    type="number"
                    variant="outlined"
                    inputProps={{ style: { width: "50px" } }} 
                />
            </Grid2>
            <Grid2 size={6}>
                <TextField
                    label="Reps"
                    type="number"
                    variant="outlined"
                    inputProps={{ style: { width: "50px" } }} 
                />
            </Grid2>
        </Grid2>
    );
};

export default CreateExercise;
