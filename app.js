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

/***********/
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

var TestEntry = {
    username: "test1",
    password: "test1",
    globalEnabled: true,
    entries: []
}
/**********/



var userRouter = express.Router();

var schemaObject = require('./schemaObject.js');

var TODOPlaceHolder = console.log;

userRouter.get('/:username', function (req, res, next) {
    var db = require('./database.js');
    var newUserData = new db.UserData();

    newUserData.findByUsername(req.params.username, function (err, result) {
        if (err) {
            // TODO: Handler here
            TODOPlaceHolder(1);
            //db.Close();
        } else {
            if (result instanceof Array && result.length > 0) {
                var user = schemaObject.UserStruct.fromObject(result[0]);
                // TODO: Render page
                TODOPlaceHolder(2);
                //db.Close();
            } else {
                // TODO: Handler here
                TODOPlaceHolder(3);
                //db.Close();
            }
        }
    });
});

app.use("/user", userRouter);

var dashboardRouter = express.Router();

dashboardRouter.get("/:username", function () {
    var db = require('./database.js');
    var newUserData = new db.UserData();

    newUserData.findByUsername(req.params.username, function (err, result) {
        if (err) {
            // TODO: Handler here
            TODOPlaceHolder(4);
            db.Close();
        } else {
            if (result instanceof Array && result.length > 0) {
                var user = schemaObject.UserStruct.fromObject(result[0]);
                // TODO: Render page
                TODOPlaceHolder(5);
                db.Close();
            } else {
                // TODO: Handler here
                TODOPlaceHolder(6);
                db.Close();
            }
        }
    });
});

app.use("/dashboard", userRouter);

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
