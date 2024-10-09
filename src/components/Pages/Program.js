import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import likeImg from "../Assets/images/like.png"
import likedImg from "../Assets/images/liked.png"
import deleteImg from "../Assets/images/trash.png"

const Program = ({loggedIn}) => {
    const [programData, setProgramData] = useState([])
    const [liked, setLiked] = useState(false)
    const [numLikes, setNumLikes] = useState(0)
    const [cantLike, setCantLike] = useState("")
    const {p_id} = useParams();
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [userid, setUserId] = useState(null)
    const [isCreator, setIsCreator] = useState(false)
    const isMobile = useMediaQuery('(max-width:730px)');
    const [open, setOpen] = useState(false)

    const handleSetOpen = () => {
        setOpen(!open)
    }
    
    const handleChange = async () => {
        if(loggedIn) {
            try {
                if (!liked) {
                    setLiked(true);
                    await axios.post('/addlike', null, { params: { p_id: p_id } })
                        .then(res => {
                            console.log('added like');
                            setNumLikes(numLikes+1)
                        })
                        .catch(err => console.log(err));
                } else {
                    setLiked(false);
                    await axios.delete('/removelike', { params: { p_id: p_id } })
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
    const navigate = useNavigate();

    const deleteProgram = () => {
        axios.delete('/deleteProgram', { params: {p_id: p_id}})
            .then(res => {
                console.log('deleted program')
                navigate('/programs')
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`/workoutprograms/${p_id}`)
            .then((res) => {
                const { programDetails, author, likes, titlename, userid } = res.data;
                const groupedData = Object.values(programDetails.reduce((acc, detail) => {
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
                setAuthor(author);
                setNumLikes(likes);
                setTitle(titlename)
                setUserId(userid)
                axios.get('/isCreator', { params: { userid: userid}})
                    .then(res=> {
                        setIsCreator(res.data.isCreator === true);
                    })
                    .catch(err => console.log(err));
                axios.get('/liked', { params: { p_id: p_id } })
                    .then(res => {
                        console.log('liked:', res.data.liked);
                        setLiked(res.data.liked === true);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [p_id]);
    

    return (
        <Container sx={{ marginTop: "100px"}}>
            <Grid2 container size={12}>
                <Typography sx={{fontSize:'40px', fontWeight:'bold', color:"white", textAlign:'center'}}>{title}</Typography>
            </Grid2>
            {programData?.map((week)=> (
                <Box sx={{borderStyle:"solid", padding:"20px", borderColor:"white", borderWidth:"2px"}}>
                    <Typography sx={{fontSize:"24px", fontWeight:"bold", mb:"20px", color:"white"}}>Week {week.week_number}</Typography>
                    <Grid2 container>
                        {week.days.map((day) => (
                        <Grid2 key={day.day_number} size={isMobile ? 3.4 : 1.7} container sx={{ flexDirection: "column", mb: "40px" }}>
                            <Typography sx={{ fontSize: "25px", color: "white" }}>Day {day.day_number}</Typography>
                            <Grid2 container sx={{ flexDirection: "column"}}>
                            {day.exercises.map((exercise) => (
                                <Grid2>
                                    <hr style={{width:"90%", textAlign:'left', margin:0}} />
                                    <Typography sx={{ color: "white" }}>
                                        {exercise.exercise}
                                    </Typography>
                                    <Typography sx={{ color: "white" }}>
                                        {exercise.num_sets} x {exercise.reps}
                                    </Typography>
                                </Grid2>
                            ))}
                            </Grid2>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            ))}
            <Grid2 container size={12}>
                <Grid2 size={6}>
                    <Typography sx={{ fontSize: "18px", mt: "30px",color:"white"}}>Author: {author}</Typography>
                </Grid2>
                <Grid2 container size={5} spacing={1}>
                    <Grid2 size={8} container justifyContent="flex-end" alignItems="center" sx={{marginTop:"10px"}}>
                        <img src={liked?likedImg:likeImg} style={{width:"50px", cursor:"pointer"}} onClick={handleChange} />
                        <Typography sx={{color:'white'}}> {numLikes} likes</Typography>
                    </Grid2>
                    <Grid2 size={3} container justifyContent="flex-start" alignItems="center">
                        <Typography sx={{color:'#e6105b', marginTop:"10px"}}>{cantLike}</Typography>
                    </Grid2>
                </Grid2>
                {isCreator &&
                    <Grid2 size={1} container justifyContent="center" alignItems="center" sx={{marginTop:"10px"}}>
                        <img src={deleteImg} style={{width:"40px", cursor:"pointer"}} onClick={handleSetOpen}/>
                    </Grid2>
                }
                <Dialog open={open} onClose={handleSetOpen}>
                    <DialogTitle>
                        Are you sure you want to delete this?
                    </DialogTitle>
                    <DialogActions>
                        <Grid2 container size={6} justifyContent="center">
                            <Button onClick={deleteProgram} variant="contained" sx={{backgroundColor:"#34abeb"}}>Confirm</Button>
                        </Grid2>
                        <Grid2 container size={6} justifyContent="center">
                            <Button onClick={handleSetOpen} variant="contained" sx={{backgroundColor:"#34abeb"}}>Cancel</Button>
                        </Grid2>
                    </DialogActions>
                </Dialog>
            </Grid2>
        </Container>
    );
};

export default Program;
