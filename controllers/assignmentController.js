const assignmentService = require('../services/assignmentService');

const createAssignment = async (req, res) => {
    try {
        const assignment = req.body;
        assignment.createdBy = req.username;
        const response = await assignmentService.createAssignment(assignment);
        res.status(201).json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const getAssignments = async (req, res) => {
    try {
        const {username} = req;
        const assignments = await assignmentService.getAssignments(username);
        res.json(assignments);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const getAssignmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const {username} = req;
        const assignment = await assignmentService.getAssignmentById(id, username);
        res.json(assignment);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const updateAssignment = async (req, res) => {
    try {
        const id = req.params.id;
        const assignment = req.body;
        assignment.createdBy = req.username;
        const response = await assignmentService.updateAssignment(id, assignment);
        res.json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const deleteAssignment = async (req, res) => {
    try {
        const id = req.params.id;
        const {username} = req;
        const response = await assignmentService.deleteAssignment(id, username);
        res.json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const postSubmission = async (req, res) => {
    try {
        const id = req.params.id;
        const submission = req.body;
        const response = await assignmentService.postSubmission(id, submission);
        res.json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const getSubmissions = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const {username} = req;
        const submissions = await assignmentService.getSubmissions(assignmentId, username);
        res.json(submissions);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const getSubmissionById = async (req, res) => {
    try {
        const id = req.params.id;
        const assignmentId = req.params.assignmentId;
        const {username} = req;
        const submission = await assignmentService.getSubmissionById(id, assignmentId, username);
        res.json(submission);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

const scoreSubmission = async (req, res) => {
    try {
        const id = req.params.id;
        const {assignmentId, score} = req.body;
        const {username} = req;
        const response = await assignmentService.scoreSubmission(id, assignmentId, score, username);
        res.json(response);
    } catch (error) {
        res.status(error.statusCode || 500).json({error: error.message});
    }
}

module.exports = {
    createAssignment,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment,
    postSubmission,
    getSubmissions,
    getSubmissionById,
    scoreSubmission
};