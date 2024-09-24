const express = require('express');
const path = require('path');
const client = require('./database.js');
const cors = require('cors'); 
const app = express();

app.use(cors());
app.use(express.json());
client.connect();

app.get('/workoutprograms', (req, res) => {
    client.query('SELECT * FROM workout_programs', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log(result.rows)
        res.send(result.rows);
    });
});

app.get('/workoutprograms/:p_id', (req, res) => {
    const p_id = req.params.p_id;
    
    const query = `
        SELECT w.week_number, w.weeks_id, d.day_id, d.day, e.exercise, e.num_sets, e.reps, e.duration 
        FROM workout_programs wp
        INNER JOIN weeks w ON wp.p_id = w.p_id
        INNER JOIN days d ON w.weeks_id = d.weeks_id
        INNER JOIN exercise e ON d.day_id = e.day_id
        WHERE wp.p_id = $1;
    `;
    client.query(query, [p_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const rows = result.rows;
            const workoutProgram = {
                p_id: p_id,
                weeks: []
            };

            rows.forEach(row => {
                let week = workoutProgram.weeks.find(w => w.weeks_id === row.weeks_id);
                
                if (!week) {
                    week = {
                        weeks_id: row.weeks_id,
                        week_number: row.week_number,
                        days: []
                    };
                    workoutProgram.weeks.push(week);
                }
                let day = week.days.find(d => d.day_id === row.day_id);
                
                if (!day) {
                    day = {
                        day_id: row.day_id,
                        day: row.day,
                        exercises: []
                    };
                    week.days.push(day);
                }

                day.exercises.push({
                    exercise: row.exercise,
                    num_sets: row.num_sets,
                    reps: row.reps,
                    duration: row.duration
                });
            });
            
            res.json(workoutProgram);
        }
    });
});


app.listen(3300, () => {
    console.log("Server is now listening on port 3000");
});