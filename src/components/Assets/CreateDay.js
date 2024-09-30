import { Box, Typography, Button, Grid2 } from "@mui/material";
import CreateExercise from "./CreateExercise";
import { useFieldArray, useFormContext } from "react-hook-form";

const CreateDay = ({ day_num, week_num }) => {
    const { control } = useFormContext(); 
    const { fields: exercisesFields, append: appendExercise, remove: removeExercise } = useFieldArray({
        control,
        name: `weeks.${week_num - 1}.days.${day_num - 1}.exercises`
    });

    return (
        <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', padding: 1, margin: 1, width: '100%', flex: '1 0 30%' }}>
            <Typography variant="body1" gutterBottom>
                Day {day_num}
            </Typography>
            {exercisesFields.map((exercise, index) => (
                <CreateExercise key={exercise.id} week_num={week_num} day_num={day_num} index={index} />
            ))}
            <Grid2 size={12} container>
                <Grid2 size={6}>
                    <Button onClick={() => appendExercise({})}>Add exercise</Button>
                </Grid2>
                <Grid2 size={6}>
                    <Button onClick={() => removeExercise(exercisesFields.length - 1)}>Delete exercise</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CreateDay;
