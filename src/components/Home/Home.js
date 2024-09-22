import { Accordion, AccordionSummary, AccordionDetails, Box, Container, Grid2, Typography } from "@mui/material";

const Home = () => {
    const workoutPrograms = [
        {
            id: 1,
            title: 'Beginner Strength Program',
            workout: [
                {
                    day: 'Monday',
                    exercises: [
                        { name: 'Squats', sets: 5, reps: 5 },
                        { name: 'Push-Ups', sets: 3, reps: 10 },
                        { name: 'Plank', duration: '30s' }
                    ]
                },
                {
                    day: 'Wednesday',
                    exercises: [
                        { name: 'Bench Press', sets: 5, reps: 5 },
                        { name: 'Dumbbell Rows', sets: 4, reps: 8 }
                    ]
                },
                {
                    day: 'Friday',
                    exercises: [
                        { name: 'Deadlift', sets: 1, reps: 5 },
                        { name: 'Lunges', sets: 4, reps: 10 }
                    ]
                }
            ],
            author: 'John Doe',
            description: 'A beginner-friendly strength training program focusing on compound lifts.',
            duration: '4 weeks'
        },
        {
            id: 2,
            title: 'Intermediate Hypertrophy Program',
            workout: [
                {
                    day: 'Monday',
                    exercises: [
                        { name: 'Chest Press', sets: 4, reps: 8 },
                        { name: 'Tricep Dips', sets: 3, reps: 10 }
                    ]
                },
                {
                    day: 'Wednesday',
                    exercises: [
                        { name: 'Overhead Press', sets: 4, reps: 6 },
                        { name: 'Lateral Raises', sets: 3, reps: 12 }
                    ]
                },
                {
                    day: 'Friday',
                    exercises: [
                        { name: 'Leg Press', sets: 4, reps: 10 },
                        { name: 'Calf Raises', sets: 3, reps: 15 }
                    ]
                }
            ],
            author: 'Jane Smith',
            description: 'An intermediate program targeting hypertrophy with higher volume exercises.',
            duration: '6 weeks'
        }
    ];

    return (
        <Container sx={{ marginTop: "100px" }}>
            {workoutPrograms.map(program => (
                <Accordion key={program.id}>
                    <AccordionSummary>
                        <Typography sx={{ fontWeight: "bold", fontSize: "25px" }}>{program.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {program.workout.map(day => (
                            <Box key={day.day}>
                                <Typography sx={{ fontSize: "20px" }}>{day.day}</Typography>
                                <Grid2 container sx={{ gap: "50px" }}>
                                    {day.exercises.map(exercise => (
                                        <Grid2 item key={exercise.name}>
                                            <Typography>
                                                {exercise.name}
                                            </Typography>
                                            <Typography>{exercise.sets}x{exercise.reps}</Typography>
                                        </Grid2>
                                    ))}
                                </Grid2>
                            </Box>
                        ))}
                        <Typography>Author: {program.author}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    );
}

export default Home;
