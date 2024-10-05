const client = require('../database.js');

module.exports.workouts_get = (req,res) => {
    client.query('SELECT * FROM workout_programs', (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        console.log("getting all workout programs")
        res.status(200).json(result.rows);
    });
}

module.exports.program_get = ('/workoutprograms/:p_id', (req, res) => {
    const p_id = req.params.p_id;
    const query = `
        SELECT week_number, day_number, exercise, num_sets, reps
        FROM program_details WHERE p_id=$1
    `;
    client.query(query, [p_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result.rows)
            res.status(200).json(result.rows)
        }
    });
})


module.exports.create_program = ('/createprogram', async (req,res)=> {
    try {
        const userId = req.user.id
        const { title, p_type, num_weeks, days, weeks, name} = req.body.data
        await client.query('BEGIN');
        const result = await client.query(
          'INSERT INTO workout_programs (title, p_type, author, num_weeks, days_per_week, userId) VALUES ($1, $2, $3, $4, $5, $6) RETURNING p_id',
          [title, p_type, name, num_weeks, days, userId]
        );
        const p_id = result.rows[0].p_id
        const query = `INSERT INTO program_details (p_id,week_number,day_number,exercise,num_sets,reps) VALUES ($1, $2, $3, $4, $5, $6)`
        weeks.forEach((week,week_index) => {
            week.days.forEach((day,day_index)=> {
                day.exercises.forEach((exercise, exercise_index)=> {
                    client.query(query,[p_id,week_index+1,day_index+1,exercise.exercise,exercise.num_sets,exercise.reps])
                })
            })
        })
        await client.query('COMMIT')
        res.status(200).json('inserted into database')
    }catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting workout program:', err);
        res.status(500).json({ error: 'Failed to create workout program' });
      }
})