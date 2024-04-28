const {v4 : uuidv4} = require('uuid');
const initializeDB = require('../config/database.js');
const { validateAssignment, validateSubmission } = require('../utils/validate.js');

let db;
initializeDB().then(database => {
  db = database;
});

const createAssignment = async (assignment) => {
    try {
        validateAssignment(assignment);
        const {title, description, dueDate, totalScore, createdBy} = assignment;
        const id = uuidv4();
        const query = `INSERT INTO assignments (id, title, description, due_date, total_score, created_by) VALUES (?, ?, ?, ?, ?, ?)`;
        await db.run(query, [id, title, description, dueDate, totalScore, createdBy]);
        return {message: 'Assignment created successfully', id};
    } catch (error) {
        throw error;
    }
}

const getAssignments = async (createdBy) => {
    try {
        const query = `SELECT * FROM assignments WHERE created_by = ?`;
        const assignments = await db.all(query, [createdBy]);
        return assignments;
    } catch (error) {
        throw error;
    }
}

const getAssignmentById = async (id, username) => {
    try {
        const query = `SELECT * FROM assignments WHERE id = ? AND created_by = ?`;
        const assignment = await db.get(query, [id, username]);
        if (!assignment) {
            const error = new Error('Assignment not found');
            error.statusCode = 404;
            throw error;
        }
        return assignment;
    } catch (error) {
        throw error;
    }
}

const updateAssignment = async (id, assignment) => {
    try {
        validateAssignment(assignment);
        const validAssignment = await getAssignmentById(id, assignment.createdBy);
        if(validAssignment.created_by !== assignment.createdBy) {
            const error = new Error('You are not authorized to update this assignment');
            error.statusCode = 403;
            throw error;
        }

        const {title, description, dueDate, totalScore, createdBy} = assignment;
        const query = `UPDATE assignments SET title = ?, description = ?, due_date = ?, total_score = ?, created_by = ? WHERE id = ?`;
        await db.run(query, [title, description, dueDate, totalScore, createdBy, id]);
        return {message: 'Assignment updated successfully'};
    } catch (error) {
        throw error;
    }
}

const deleteAssignment = async (id, createdBy) => {
    try {
        const validAssignment = await getAssignmentById(id, createdBy);
        if(validAssignment.created_by !== createdBy) {
            const error = new Error('You are not authorized to delete this assignment');
            error.statusCode = 403;
            throw error;
        }

        const query = `DELETE FROM assignments WHERE id = ?`;
        await db.run(query, [id]);
        return {message: 'Assignment deleted successfully'};
    } catch (error) {
        throw error;
    }
}

const postSubmission = async (assignmentId, submission) => {
    try {
        validateSubmission(submission);
        const id = uuidv4();
        const {studentName, docUrl} = submission;
        const validAssignmentQuery = `SELECT * FROM assignments WHERE id = ?`
        const validAssignmentResult = await db.get(validAssignmentQuery, [assignmentId])
        if (!validAssignmentResult) {
            const error = new Error('Assignment not found');
            error.statusCode = 404;
            throw error;
        }

        const query = `INSERT INTO submissions (id, assignment_id, student_name, doc_url) VALUES (?, ?, ?, ?)`;
        await db.run(query, [id, assignmentId, studentName, docUrl]);
        return {message: 'Submission posted successfully'};
    } catch (error) {
        throw error;
    }
}

const getSubmissions = async (assignmentId, createdBy) => {
    try {
        await getAssignmentById(assignmentId, createdBy);
        const query = `SELECT * FROM submissions WHERE assignment_id = ?`;
        const submissions = await db.all(query, [assignmentId]);
        return submissions;
    }
    catch (error) {
        throw error;
    }
}

const getSubmissionById = async (id, assignmentId, createdBy) => {
    try {
        await getAssignmentById(assignmentId, createdBy);
        const query = `SELECT * FROM submissions WHERE id = ? AND assignment_id = ?`;
        const submission = await db.get(query, [id, assignmentId]);
        if (!submission) {
            const error = new Error('Submission not found');
            error.statusCode = 404;
            throw error;
        }
        return submission;
    } catch (error) {
        throw error;
    }
}

const scoreSubmission = async (id, assignmentId, score, createdBy) => {
    try {
        await getAssignmentById(assignmentId, createdBy);
        const query = `UPDATE submissions SET score = ? WHERE id = ? AND assignment_id = ?`;
        await db.run(query, [score, id, assignmentId]);
        return {message: 'Submission scored successfully'};
    } catch (error) {
        throw error;
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