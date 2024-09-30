import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const CreateExercise = ({ week_num, day_num, index }) => {
    const { register } = useFormContext();

    return (
        <Grid2 container spacing={2} sx={{ mb: "20px" }}>
            <Grid2 size={12}>
                <TextField
                    {...register(`weeks.${week_num - 1}.days.${day_num - 1}.exercises.${index}.exercise`)} 
                    label="Exercise"
                    variant="outlined"
                    fullWidth
                />
            </Grid2>
            <Grid2 size={6}>
                <TextField
                    {...register(`weeks.${week_num - 1}.days.${day_num - 1}.exercises.${index}.num_sets`)}
                    label="Sets"
                    type="number"
                    variant="outlined"
                    inputProps={{ style: { width: "50px" } }} 
                />
            </Grid2>
            <Grid2 size={6}>
                <TextField
                    {...register(`weeks.${week_num - 1}.days.${day_num - 1}.exercises.${index}.reps`)}
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
