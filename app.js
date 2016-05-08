var express = require('express'),
    app = express(),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    mongoose = require('mongoose').connect(config.dbURL);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('hogan-express'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
var env = process.env.NODE_ENV || "development";
if (env === "development") {
    app.use(session({
        secret: config.sessionSecret
    }));
}
else {
    app.use(session({
        secret: config.sessionSecret,
        store: new ConnectMongo({
            url: config.dbURL,
            stringify: true
        })
    }));
}

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    fullname: String
});
var Person = mongoose.model('users', userSchema);
var John = new Person({
    username: "mnahm5",
    password: "password",
    fullname: "Md Nadim Ahmed"
});
John.save(function (err) {
    console.log('Done');
});

require('./routes/routes.js')(express,app);

app.listen(3000, function () {
    console.log("App running on Port 3000");
    console.log("Mode: " + env);
});