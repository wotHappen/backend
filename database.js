/**
 * Created by kevinqian on 10/7/17.
 */
var fs = require("fs");
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
};

// var newUserData = new UserData();
//
// newUserData.findByUsername("test", function (err, result) {
//     console.log(result);
// });
//
// console.log(newUserData.toJSON());
//
// newUserData.save(function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('done');
//     }
// });

module.exports = {
    UserData: UserData,
    Close: mongoose.connection.close
};
