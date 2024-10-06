import { Button, Container, Grid2, TextField, Box, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import CreateWeek from "../Assets/CreateWeek";
import axios from "axios";
import { useNavigate } from "react-router-dom";


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
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    const createLayout = data => {
        const newWeeksComponent = [];
        setWeeksComponents(newWeeksComponent);
        for (let i = 1; i <= data.num_weeks; i++) {
            newWeeksComponent.push(<CreateWeek key={i} week_num={i} num_days={data.days} />);
        }
        setWeeksComponents(newWeeksComponent);
        console.log(weeksComponents)
        setDisabled(false)
    };

    const onSubmit = data => {

        axios.post('/createprogram', {data: data})
            .then(res => {
                console.log(res)
            })
            .catch(err=> console.log(err));
    };

    useEffect(()=> {
        axios.get('/getUser')
            .then(res => {
                console.log(res)
                setLoading(false);
            })
            .catch(err => {
                navigate('/login')
            })
    },[])

    if (loading) {
        return null;
    }

    return (
        <Container sx={{ marginTop: "100px", backgroundColor: "gray", borderRadius:'20px' }}>
            <FormProvider {...{ register, handleSubmit, control }}>
                <form onSubmit={handleSubmit(createLayout)}>
                    <Grid2 container size={12}>
                        <Grid2 size={11} sx={{marginLeft:"auto", marginRight:"auto", marginTop:"20px"}}>
                            <label>
                                Title <br />
                                <TextField required disabled={!disabled} autoComplete="off" {...register("title")} sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",width:"100%", minWidth: "160px", backgroundColor:!disabled?"darkgray":"white", mb:"20px"}}/>
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} container justifyContent="center">
                            <label>
                                Your Name<br />
                                <TextField required disabled={!disabled} autoComplete="off" {...register("name")} sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",backgroundColor: !disabled?"darkgray":"white"}} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} container justifyContent="center">
                            <label>
                                What type of program is this?<br />
                                <TextField required disabled={!disabled} autoComplete="off" {...register("p_type")} sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",backgroundColor: !disabled?"darkgray":"white"}} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} container justifyContent="center">
                            <label>
                                Number of weeks <br />
                                <TextField required disabled={!disabled} autoComplete="off" type="number" {...register("num_weeks")} sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",backgroundColor: !disabled?"darkgray":"white"}} />
                            </label>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} container justifyContent="center">
                            <label>
                                Days a week <br />
                                <TextField required disabled={!disabled} autoComplete="off" type="number" {...register("days")} sx={{'& .MuiOutlinedInput-notchedOutline': {borderRadius: '10px',}, borderRadius:"10px",backgroundColor: !disabled?"darkgray":"white"}} />
                            </label>
                        </Grid2>
                    </Grid2>
                    <Grid2 container justifyContent="center">
                        <Button type="submit" variant="contained" sx={{marginTop:"20px", mb:"20px",backgroundColor:"#34abeb"}} disabled={!disabled}>Next</Button>
                    </Grid2>
                </form>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {weeksComponents}
                    <Grid2 container justifyContent="center">
                        <Button type="submit" variant="contained" disabled={disabled} sx={{marginTop:"20px", mb:"20px",backgroundColor:"#34abeb"}}>Create Program</Button>
                    </Grid2>
                </form>
            </FormProvider>
        </Container>
    );
};

export default CreateProgram;
