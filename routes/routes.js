module.exports = function (express, app) {
    var router = express.Router();
    
    router.get('/', function (req, res, next) {
        res.render('home', {
            title: "Welcome to my Game"
        });
    });
    router.get('/user', function (req, res, next) {
        res.render('user', {
            title: "Welcome User"
        });
    });
    router.get('/setcolor', function (req, res, next) {
        req.session.favColor = "Red";
        res.send("Setting favourite color !");
    });
    router.get('/getcolor', function (req, res, next) {
        res.send("Favourite Color: " + (req.session.favColor===undefined?"Not Found":req.session.favColor));
    });

    app.use('/',router);
};