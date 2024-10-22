const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const eventsRoute = require('./events.route');
const articlesRoute = require('./articles.route');
const config = require('../../config/config');
const uploadRoute = require('./upload.route');
const monadMadness = require('./monadMadness.route');
const spacesRoute = require('./spaces.route');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/users',
        route: userRoute,
    },
    {
        path: '/events',
        route: eventsRoute,
    },
    {
        path: '/articles',
        route: articlesRoute,
    },
    {
        path: '/upload',
        route: uploadRoute,
    },
    {
        path: '/monad-madness',
        route: monadMadness,
    },
    {
        path: '/spaces',
        route: spacesRoute,
    },
];

const devRoutes = [
    // routes available only in development mode
    {
        path: '/docs',
        route: docsRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

module.exports = router;
