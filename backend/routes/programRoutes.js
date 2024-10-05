const { Router } = require('express');
const programController = require('../controllers/programController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = Router();

router.get('/workoutprograms',programController.workouts_get);
router.get('/workoutprograms/:p_id', programController.program_get);
router.post('/createprogram', authenticateToken, programController.create_program)

module.exports = router;
