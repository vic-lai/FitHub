import { Button, Container, Grid2, TextField, Box, Typography, Paper } from "@mui/material";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CreateWeek from "../Assets/CreateWeek";
import axios from "axios";

const CreateProgram = () => {
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            title: '',
            p_type: '',
            num_weeks: '',
            days: '',
            weeks: []
        }
    });

    const [weeksComponents, setWeeksComponents] = useState([]);

    const createLayout = data => {
        const newWeeksComponent = [];
        setWeeksComponents(newWeeksComponent);
        for (let i = 1; i <= data.num_weeks; i++) {
            newWeeksComponent.push(<CreateWeek key={i} week_num={i} num_days={data.days} />);
        }
        setWeeksComponents(newWeeksComponent);
        console.log(weeksComponents)
    };

    const onSubmit = data => {
        axios.post('http://localhost:3300/createprogram', {data: data})
            .then(res => {
                console.log(res)
            })
            .catch(err=> console.log(err));
    };

    return (
        <Container sx={{ marginTop: "100px", backgroundColor: "gray" }}>
            <FormProvider {...{ register, handleSubmit, control }}>
                <form onSubmit={handleSubmit(createLayout)}>
                    <Grid2 container size={12}>
                        <Grid2 size={12}>
                            <label>
                                Title <br />
                                <input {...register("title")} style={{ width: "90%", minWidth: "160px" }} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <label>
                                Your Name<br />
                                <input {...register("name")} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <label>
                                What type of program is this?<br />
                                <input {...register("p_type")} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <label>
                                Number of weeks <br />
                                <input {...register("num_weeks")} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <label>
                                Days a week <br />
                                <input {...register("days")} />
                            </label>
                        </Grid2>
                    </Grid2>
                    <Button type="submit">Next</Button>
                </form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {weeksComponents}
                    <Button type="submit" variant="contained">Create Program</Button>
                </form>
            </FormProvider>
        </Container>
    );
};

export default CreateProgram;
