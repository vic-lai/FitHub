import { Accordion, AccordionSummary, AccordionDetails, Box, Container, Grid2, Typography, Select, InputLabel, FormControl, MenuItem, OutlinedInput } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from "react";
import axios from "axios";

const ProgramList = () => {
    const navigate = useNavigate();
  
    const [sort, setSort] = useState("")
    const [type, setType] = useState("Any")
    const [types, setTypes] = useState([])
    const [week, setWeek] = useState("Any")
    const [weeks, setWeeks] = useState([])
    const [day, setDay] = useState("Any")
    const [days, setDays] = useState([])
    const sortByOptions = [
        "Top", "Newest", "Oldest"
    ]
    
    const handleClick = (program) => {
        const formattedTitle = program.title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/program/${program.p_id}/${formattedTitle}`)
    }

    const [workoutPrograms, setWorkoutPrograms] = useState([]);
    const [sortedPrograms, setSortedPrograms] = useState([])
    const handleSort = (event) => {
        setSort(event.target.value)
        sortPrograms(event.target.value)
      };

    const handleType = (event) => {
        setType(event.target.value)
    }

    const handleWeek = (event) => {
        setWeek(event.target.value)
    }

    useEffect(() => {
        const filteredPrograms = workoutPrograms.filter((program) => {
            const typeMatch = (type === "Any" || program.p_type === type);
            const weekMatch = (week === "Any" || program.num_weeks === week);
            const dayMatch = (day === "Any" || program.days_per_week === day);
            return typeMatch && weekMatch && dayMatch;
        });
        setSortedPrograms(filteredPrograms);
    }, [type, week, day, workoutPrograms]);

    const handleDay = (event) => {
        setDay(event.target.value)
    }

    const sortPrograms = (sortBy) => {
        const allSortedPrograms = [...workoutPrograms];
        const sortPrograms = [...sortedPrograms];
        if (sortBy === "Top") {
            allSortedPrograms.sort((a, b) => b.likes - a.likes);
            sortPrograms.sort((a, b) => b.likes - a.likes);
        } else if (sortBy === "Newest") {
            allSortedPrograms.sort((a, b) => b.p_id - a.p_id); 
            sortPrograms.sort((a, b) => b.p_id - a.p_id); 
        } else if (sortBy === "Oldest") {
            allSortedPrograms.sort((a, b) => a.p_id - b.p_id); 
            sortPrograms.sort((a, b) => a.p_id - b.p_id); 
        }
        setWorkoutPrograms(allSortedPrograms);
        setSortedPrograms(sortPrograms);
    };

    useEffect(()=> {
        axios.get('/workoutprograms')
          .then((res) => {
            const programs = res.data
            setWorkoutPrograms(res.data);
            setSortedPrograms(res.data)
            const uniqueTypes = [...new Set(programs.map(program=>program.p_type))];
            const uniqueWeeks = [...new Set(programs.map(program=>program.num_weeks))];
            const uniqueDays = [...new Set(programs.map(program=>program.days_per_week))];
            setTypes(["Any", ...uniqueTypes]);
            setWeeks(["Any", ...uniqueWeeks])
            setDays(["Any", ...uniqueDays])
            })
          .catch(err=> console.log(err));
      },[])

    return (
        <Container sx={{ marginTop: "100px", backgroundColor:"gray", padding:"50px", borderRadius:"20px" }}>
            <Grid2 container sx={{mb:"10px"}}>
                <Grid2 size={{xs:6,md:3}} container justifyContent="center">
                    <FormControl sx={{width:120, backgroundColor:"white", mb:"10px"}}>
                        <InputLabel id="sort-by" sx={{fontWeight:'bold', fontSize:"18px"}}>Sort By</InputLabel>
                        <Select
                        labelId="sort-by"
                        value={sort}
                        onChange={handleSort}
                        >
                            {sortByOptions.map((option) => (
                                <MenuItem
                                value={option}
                                >
                                {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 size={{xs:6,md:3}} container justifyContent="center">
                    <FormControl sx={{width:120, backgroundColor:"white", mb:"10px"}}>
                        <InputLabel id="p_type" sx={{fontWeight:'bold', fontSize:"18px"}}>Type</InputLabel>
                        <Select
                        labelId="p_type"
                        value={type}
                        onChange={handleType}
                        >
                            {types.map((type) => (
                                <MenuItem
                                value={type}
                                >
                                {type}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2> 
                <Grid2 size={{xs:6,md:3}} container justifyContent="center">
                    <FormControl sx={{width:120, backgroundColor:"white", mb:"10px"}}>
                        <InputLabel id="weeks" sx={{fontWeight:'bold', fontSize:"18px"}}>Weeks</InputLabel>
                        <Select
                        labelId="weeks"
                        value={week}
                        onChange={handleWeek}
                        >
                            {weeks.map((numweeks) => (
                                <MenuItem
                                value={numweeks}
                                >
                                {numweeks}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2> 
                <Grid2 size={{xs:6,md:3}} container justifyContent="center">
                    <FormControl sx={{width:120, backgroundColor:"white", mb:"10px"}}>
                        <InputLabel id="days" sx={{fontWeight:'bold', fontSize:"18px"}}>Days</InputLabel>
                        <Select
                        labelId="days"
                        value={day}
                        onChange={handleDay}
                        >
                            {days.map((numdays) => (
                                <MenuItem
                                value={numdays}
                                >
                                {numdays}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2> 
            </Grid2>
            {sortedPrograms.map(program => (
                <Accordion key={program.p_id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid2 container size={12}>
                            <Grid2 size={6} container justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ fontWeight: "bold", fontSize: "25px",'&:hover': {
                                    color:"#34abeb"
                                }}} onClick={()=>handleClick(program)} variant="h1">{program.title}</Typography>
                            </Grid2>
                            <Grid2 size={5} container justifyContent="flex-end">
                            <Typography sx={{color:'black'}}>Likes: {program.likes}</Typography>
                            </Grid2>
                        </Grid2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid2 container size={12}>
                            <Grid2 size={6} container>
                                <Typography sx={{color:"black"}}>Type: {program.p_type} </Typography>
                            </Grid2>
                            <Grid2 size={6} container justifyContent="flex-start">
                                <Typography sx={{color:"black"}}> Author: {program.author}</Typography>
                            </Grid2>
                        </Grid2>
                        <Grid2 container size={12}>
                        <Grid2 size={6} container>
                                <Typography sx={{color:"black"}}>Number of weeks: {program.num_weeks} </Typography>
                            </Grid2>
                            <Grid2 size={6} container justifyContent="flex-start">
                                <Typography sx={{color:"black"}}>Days a week: {program.days_per_week}</Typography>
                            </Grid2>
                        </Grid2>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}

export default ProgramList;
