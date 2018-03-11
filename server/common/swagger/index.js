var middleware = require('swagger-express-middleware');
var path = require('path');

var swagger = {
    configureSwagger: configureSwagger
};

function configureSwagger(app, callBack) {

    middleware(path.join(__dirname, 'Api.yaml'), app, function(err, mw) {
        app.use(mw.metadata());

        app.use(mw.files({
            caseSensitive: false,
            strict: false,
        }, {
            useBasePath: true,
            apiPath: '/',
        }));

        app.use(
            mw.CORS(),
            mw.validateRequest());

        callBack(app);
    });
}

module.exports = swagger;