const validateLogin = (username, password) => {
    if (!username || !password) {
        const error = new Error('Username and password are required');
        error.statusCode = 400;
        throw error;
    }

    if (username.length < 3 || username.length > 20) {
        const error = new Error('Username must be between 3 and 20 characters');
        error.statusCode = 400;
        throw error;
    }

    if (password.length < 6 || password.length > 30) {
        const error = new Error('Password must be between 6 and 30 characters');
        error.statusCode = 400;
        throw error;
    }
}

const validateAssignment = (assignment) => {
    const {title, description, dueDate, totalScore, createdBy} = assignment;
    if (!title || !description || !dueDate || !totalScore || !createdBy) {
        const error = new Error('Title, description, due date, total score, and created by are required');
        error.statusCode = 400;
        throw error;
    }

    if (title.length < 3 || title.length > 50) {
        const error = new Error('Title must be between 3 and 50 characters');
        error.statusCode = 400;
        throw error;
    }

    if (description.length < 10 || description.length > 500) {
        const error = new Error('Description must be between 10 and 500 characters');
        error.statusCode = 400;
        throw error;
    }

    if (isNaN(totalScore) || totalScore < 1 || totalScore > 100) {
        const error = new Error('Total score must be a number between 1 and 100');
        error.statusCode = 400;
        throw error;
    }

    if (createdBy.length < 3 || createdBy.length > 20) {
        const error = new Error('Created by must be between 3 and 20 characters');
        error.statusCode = 400;
        throw error;
    }

    if (new Date(dueDate) < new Date()) {
        const error = new Error('Due date must be in the future');
        error.statusCode = 400;
        throw error;
    }

    if (new Date(dueDate) > new Date(new Date().setFullYear(new Date().getFullYear() + 1))) {
        const error = new Error('Due date must be within one year');
        error.statusCode = 400;
        throw error;
    }
}

const validateSubmission = (submission) => {
    const {studentName, docUrl} = submission;
    if (!studentName || !docUrl) {
        const error = new Error('Student name and file path are required');
        error.statusCode = 400;
        throw error;
    }

    if (studentName.length < 3 || studentName.length > 20) {
        const error = new Error('Student name must be between 3 and 20 characters');
        error.statusCode = 400;
        throw error;
    }

    if (!docUrl.startsWith('http://') && !docUrl.startsWith('https://')) {
        const error = new Error('Document URL must start with http:// or https://');
        error.statusCode = 400;
        throw error;
    }
}

module.exports = {
    validateLogin,
    validateAssignment,
    validateSubmission
};