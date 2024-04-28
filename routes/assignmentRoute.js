const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/create', authenticateToken, assignmentController.createAssignment);
router.get('/get', authenticateToken, assignmentController.getAssignments);
router.get('/get/:id', authenticateToken, assignmentController.getAssignmentById);
router.put('/update/:id', authenticateToken, assignmentController.updateAssignment);
router.delete('/delete/:id', authenticateToken, assignmentController.deleteAssignment);
router.post('/submit/:id', assignmentController.postSubmission);
router.get('/submissions/:id', authenticateToken, assignmentController.getSubmissions);
router.get('/submission/:id/:assignmentId', authenticateToken, assignmentController.getSubmissionById);
router.put('/score/:id', authenticateToken, assignmentController.scoreSubmission);

module.exports = router;