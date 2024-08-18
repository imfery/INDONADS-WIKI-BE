const httpStatus = require('http-status');

const successResponse = (data) => {
    const response = {
        code: httpStatus.OK,
        message: 'SUCCESS',
    };
    if (data) {
        response.data = data;
    }
    response.timestamps = Math.floor(Date.now() / 1000);
    return response;
};

module.exports = {
    successResponse,
};
