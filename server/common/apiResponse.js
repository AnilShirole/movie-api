var apiResposne = {
    createResposne: createResposne
};

function createResposne(error, data) {
    var response = {};

    if (error) {
        response.success = false;
        response.error = error;
    } else {
        response.success = true;
        response.data = data;
    }

    return response;
}

module.exports = apiResposne;