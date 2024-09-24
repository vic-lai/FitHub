import { Container, Grid2, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form"
import CreateWeek from "../Assets/CreateWeek";


const CreateProgram = () => {
    const {register, handleSubmit} = useForm();
    const [weeksComponents, setWeeksComponents] = useState([]);
    const onSubmit = data => {
        console.log('data', data)
        const newWeeksComponent = []
        for(let i = 1; i<=data.num_weeks;i++) {
            newWeeksComponent.push(<CreateWeek week_num={i} num_days={data.num_days} />)
        }
        setWeeksComponents(newWeeksComponent)
    }

    return (
        <Container sx={{marginTop:"100px", backgroundColor:"gray"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid2 container size={12}>
                    <Grid2 size={12}>
                        <label>
                            Title <br />
                            <input {...register("title")} style={{width:"90%", minWidth:"160px"}} />
                        </label>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6,md:3}}>
                        <label>
                            Number of weeks <br />
                            <input {...register("num_weeks")} />
                        </label>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6,md:3}}>
                        <label>
                            Days a week <br />
                            <input {...register("num_days")} />
                        </label>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6,md:3}}>
                        <label>
                            Your Name<br />
                            <input {...register("name")} />
                        </label>
                    </Grid2>
                    <Grid2 size={{xs:12,sm:6,md:3}}>
                        <label>
                            What type of program is this?<br />
                            <input {...register("type")} />
                        </label>
                    </Grid2>
                </Grid2>
                <button onClick={onSubmit}>test</button>
            </form>
            {weeksComponents}
        </Container>
    );
}
 
export default CreateProgram;