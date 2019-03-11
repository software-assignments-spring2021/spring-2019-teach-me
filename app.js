const express = require('express');
const path = require('path');
const db = require('./db');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

const Class = mongoose.model('Class');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.get('/api/classes', function(req, res) {
	Class.find({},function(err, classes, count) {
		res.json(classes);
	});
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

/*
// Temporary
app.get('/teach-others', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/about', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Temp
app.get('/payment', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

// Create Class
app.post('/create-class/:instructorId', function(req, res) {
	const newClass = new Class({
		name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        proposedSchedule: req.body.proposedSchedule,
        instructor: new mongoose.Types.ObjectId(req.params.instructorId),
    });
	newClass.save((err, newclass) => {
		if (err) {
			res.send(err);
		}
		res.send("New class created.");
	});
});

app.listen(9000);

module.exports = app;