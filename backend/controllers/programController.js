const client = require('../database.js');
const jwt = require('jsonwebtoken')

module.exports.workouts_get = (req,res) => {
    client.query('SELECT * FROM workout_programs ORDER BY p_id ASC', (err, result) => {
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
            client.query(`SELECT author, likes, title, userid FROM workout_programs WHERE p_id=$1`, [p_id], (err, programdesc) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    const response = {
                        programDetails: result.rows,
                        author: programdesc.rows[0].author,
                        likes: programdesc.rows[0].likes,
                        titlename: programdesc.rows[0].title,
                        userid: programdesc.rows[0].userid
                    }
                    res.status(200).json(response)
                }
            })
        }
    });
})


module.exports.create_program = ('/createprogram', async (req,res)=> {
    try {
        const userId = req.user.id
        const { title, p_type, num_weeks, days, weeks, name} = req.body.data
        await client.query('BEGIN');
        const result = await client.query(
          'INSERT INTO workout_programs (title, p_type, author, num_weeks, days_per_week, userId, likes) VALUES ($1, $2, $3, $4, $5, $6, 0) RETURNING p_id',
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
        res.status(200).json({p_id})
    }catch (err) {
        await client.query('ROLLBACK');
        console.error('Error inserting workout program:', err);
        res.status(500).json({ error: 'Failed to create workout program' });
      }
})

module.exports.get_like = ('/getlike', (req,res)=> {
    const token = req.cookies.jwt;
    const p_id = req.query.p_id

    if (!token) {
        console.log('no token')
        return res.status(401).json({message: 'not authenticated'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message: 'not authenticated'});
        }
        const query = `SELECT * FROM users u INNER JOIN likes l ON u.id=l.user_id WHERE u.id=$1 AND l.p_id=$2`
        console.log('checking liked', p_id, user)
        client.query(query, [user.id, p_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                const hasLiked = result.rows.length > 0
                res.status(200).json({liked: hasLiked});
            }
        });
    })
})

module.exports.add_like = ('/addlike', (req,res)=> {
    const token = req.cookies.jwt;
    const p_id = req.query.p_id

    if (!token) {
        console.log('no token')
        return res.status(401).json({message: 'not authenticated'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message: 'not authenticated'});
        }
        const query = `INSERT INTO likes (user_id,p_id) VALUES($1,$2)`
        client.query(query, [user.id, p_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                const updatequery = `UPDATE workout_programs SET likes = likes + 1 WHERE p_id=$1`
                client.query(updatequery, [p_id], (err, result)=> {
                    if(err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error')
                    } else{
                        res.status(200).json({message: 'added like'})
                    }
                })

            }
        });
    })
})

module.exports.remove_like = ('/removelike', (req,res)=> {
    const token = req.cookies.jwt;
    const p_id = req.query.p_id

    if (!token) {
        console.log('no token')
        return res.status(401).json({message: 'not authenticated'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message: 'not authenticated'});
        }
        const query = `DELETE FROM likes WHERE p_id=$1 AND user_id=$2`
        client.query(query, [p_id, user.id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                const updatequery = `UPDATE workout_programs SET likes = likes - 1 WHERE p_id=$1`
                client.query(updatequery, [p_id], (err, result)=> {
                    if(err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error')
                    } else{
                        res.status(200).json({message: 'remove like'})
                    }
                })

            }
        });
    })
})

module.exports.get_likes = ('/numlikes', (req,res)=> {
    const token = req.cookies.jwt;
    const p_id = req.query.p_id

    if (!token) {
        console.log('no token')
        return res.status(401).json({message: 'not authenticated'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message: 'not authenticated'});
        }
        const query = `SELECT likes FROM workout_programs WHERE p_id=$1`
        client.query(query, [ p_id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.status(200).json({numlikes: result.rows[0].likes});
            }
        });
    })
})



module.exports.is_creator = ('/isCreator', (req,res)=> {
    const token = req.cookies.jwt;
    const userid = Number(req.query.userid)

    if (!token) {
        console.log('no token')
        return res.status(401).json({message: 'not authenticated'});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) {
            console.log(err)
            return res.status(401).json({message: 'not authenticated'});
        }
        console.log('checking if creator', userid, user.id)
        if(userid === user.id) {
            return res.status(200).json({ isCreator: true})
        }
        else {
            return res.status(403).json({ isCreator: false})
        }
    })
})

module.exports.delete_program = ('/deleteProgram', (req, res) => {
    const p_id = req.query.p_id;
    client.query('BEGIN', (err) => {
        if (err) {
            return res.status(500).json('Error starting transaction');
        }
        const deleteDetailsQuery = `DELETE FROM program_details WHERE p_id=$1`;
        client.query(deleteDetailsQuery, [p_id], (err, result) => {
            if (err) {
                client.query('ROLLBACK', () => {
                    return res.status(500).json('Error deleting program details');
                });
            } else {
                const deleteLikes = `DELETE FROM likes WHERE p_id=$1`
                client.query(deleteLikes, [p_id], (err,result) => {
                    if(err) {
                        client.query('ROLLBACK', () => {
                            return res.status(500).json('Error deleting likes')
                        })
                    } else {
                        const deleteProgramQuery = `DELETE FROM workout_programs WHERE p_id=$1`;
                        client.query(deleteProgramQuery, [p_id], (err, result) => {
                            if (err) {
                                client.query('ROLLBACK', () => {
                                    return res.status(500).json('Error deleting workout program');
                                });
                            } else {
                                client.query('COMMIT', (err) => {
                                    if (err) {
                                        return res.status(500).json('Error committing transaction');
                                    }
                                    return res.status(200).json('Program successfully deleted');
                                });
                            }
                        });
                    }
                })
            }
        });
    });
});