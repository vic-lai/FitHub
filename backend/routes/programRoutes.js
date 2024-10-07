const { Router } = require('express');
const programController = require('../controllers/programController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = Router();

router.get('/workoutprograms',programController.workouts_get);
router.get('/workoutprograms/:p_id', programController.program_get);
router.post('/createprogram', authenticateToken, programController.create_program)
router.get('/liked', programController.get_like)
router.post('/addlike', authenticateToken, programController.add_like)
router.delete('/removelike', authenticateToken, programController.remove_like);
router.get('/numlikes', programController.get_likes)

module.exports = router;
