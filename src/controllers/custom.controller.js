const httpStatus = require('http-status');

const successResponse = (data) => {
    const response = {
        code: httpStatus.OK,
        message: 'SUCCESS'
    };
    if (data) {
        response.data = data;
    }
    return response;
};

module.exports = {
    successResponse
};