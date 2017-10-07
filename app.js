var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*********** DATABASE CONFIG ************/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MONGOOSE_PATH = 'mongodb://localhost/bomb_db';

mongoose.connect(MONGOOSE_PATH, { useMongoClient: true, promiseLibrary: global.Promise });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to database");
});

var userSchema = new Schema ({
    username: String,
    password: String,
    globalEnabled: Boolean,
    entries: [
        {
            type: String,
            enabled: Boolean,
            info: [String]
        }
    ]
});

userSchema.methods.findByUsername = function (name, cb) {
    return this.model('userdata').find({username: name}, cb);
};

var UserData = mongoose.model('userdata', userSchema, 'userdata');
/********** END DATABASE CONFIG ***********/

var schemaObject = require('./schemaObject.js');
var TODOPlaceHolder = console.log;


var userRouter = express.Router();

userRouter.get('/:username', function (req, res) {
    var newUserData = new UserData();

    newUserData.findByUsername(req.params.username, function (err, result) {
        if (err) {
            // TODO: Handler here
            TODOPlaceHolder(1);
            res.send(req.params.username);
        } else {
            if (result instanceof Array && result.length > 0) {
                var user = schemaObject.UserStruct.fromObject(result[0]);
                // TODO: Render bomb page
                TODOPlaceHolder(2);
                res.send(req.params.username);
            } else {
                // TODO: Handler here
                TODOPlaceHolder(3);
                res.send(req.params.username);
            }
        }
    });
});

app.use("/user", userRouter);



var dashboardRouter = express.Router();

dashboardRouter.get("/:username", function (req, res) {
    var newUserData = new UserData();

    newUserData.findByUsername(req.params.username, function (err, result) {
        if (err) {
            // TODO: Handler here
            TODOPlaceHolder(4);
            res.send(req.params.username);
        } else {
            if (result instanceof Array && result.length > 0) {
                var user = schemaObject.UserStruct.fromObject(result[0]);
                // TODO: Render dashboard page
                TODOPlaceHolder(5);
                res.send(req.params.username);
            } else {
                // TODO: Handler here
                TODOPlaceHolder(6);
                res.send(req.params.username);
            }
        }
    });
});

app.use("/dashboard", dashboardRouter);



app.post("/bomb", function (req, res) {
    var username = req.query.username;

    var newUserData = new UserData();

    newUserData.findByUsername(username, function (err, result) {
        if (err) {
            res.send("An error occurred");
        } else {
            if (result instanceof Array && result.length > 0) {
                var user = schemaObject.UserStruct.fromObject(result[0]);
                // TODO: Render dashboard page
                res.send("Message sent");
            } else {
                res.send("An error occurred");
            }
        }
    });
});


app.post("/update", function (req, res) {
    var updateType = req.query.updateType;

    switch (updateType) {
        case "add":
            
            break;
        case "remove":
            break;
        default:
            //TODO: handle error here
    }
});



app.get("/", function (req, res) {
   //TODO: handle Main page
});

app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.send("404 - Not Found");
});

app.listen(8000);

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
