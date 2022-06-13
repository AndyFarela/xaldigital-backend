module.exports = CreateRouter;
const Middleware = require('./Middleware');

function CreateRouter(express, incorporateMid) {
    const router = express.Router();

    if(incorporateMid === false) {
        return router;
    }

    router.use(Middleware.initialize());
    // router.use(Middleware.authorize());
    // router.use(Middleware.GetUser);
    
    return router;
}