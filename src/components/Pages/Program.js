import { Box, Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import likeImg from "../Assets/images/like.png"
import likedImg from "../Assets/images/liked.png"

const Program = ({loggedIn}) => {
    const location = useLocation();
    const { program } = location.state || {};
    const [programData, setProgramData] = useState([])
    const [liked, setLiked] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const [cantLike, setCantLike] = useState("")

    const handleChange = async () => {
        if(loggedIn) {
            try {
                if (!liked) {
                    setLiked(true);
                    await axios.post('/addlike', null, { params: { p_id: program.p_id } })
                        .then(res => {
                            console.log('added like');
                            setNumLikes(numLikes+1)
                        })
                        .catch(err => console.log(err));
                } else {
                    setLiked(false);
                    await axios.delete('/removelike', { params: { p_id: program.p_id } })
                        .then(res => {
                            console.log('removed like');
                            setNumLikes(numLikes-1)
                        })
                        .catch(err => console.log(err));
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            setCantLike("Log in to like")
        }
    };

    useEffect(()=> {
        setNumLikes(program.likes)
    },[])


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

            setProgramData(groupedData)
            axios.get('/liked', {params: {p_id: program.p_id}})
                .then(res => {
                    console.log('liked:',res.data.liked)
                    if (res.data.liked === true) {
                        setLiked(true)
                    }
                    else {
                        setLiked(false)
                    }
                })
                .catch(err => console.log(err))
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
            <Grid2 container size={12}>
                <Grid2 size={6}>
                    <Typography sx={{ fontSize: "18px", mt: "30px",color:"white"}}>Author: {program.author}</Typography>
                </Grid2>
                <Grid2 container size={6}>
                    <Grid2 size={12} container justifyContent="center" alignItems="center" sx={{marginTop:"10px"}}>
                        <img src={liked?likedImg:likeImg} style={{width:"50px", cursor:"click"}} onClick={handleChange} />
                        <Typography sx={{color:'white'}}> {numLikes} likes</Typography>
                    </Grid2>
                    <Grid2 size={12} container justifyContent="center">
                        <Typography sx={{color:'#e6105b'}}>{cantLike}</Typography>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default Program;
