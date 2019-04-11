const express = require('express');
const path = require('path');
const db = require('./db');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");

const Class = mongoose.model('Class');
const Users = mongoose.model('users');
const UserClass = mongoose.model('UserClass');
const Instructor = mongoose.model('Instructor');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.get('/api/classes', function(req, res) {
	Class.find({}, function(err, classes, count) {
		res.json(classes);
	});
});

app.get('/api/classes/:classId', function(req, res) {
	Class
		.findOne({_id: req.params.classId})
		.populate({
			path: 'instructor',
			populate: {
				path: 'userID',
				model: 'users'
			}
		})
		.exec(function(err, classData) {
			if (err) {
				console.log(err)
			}
			classData = classData.toObject();
			classData.instructorName = classData.instructor.userID.name;
			classData.instructorID = classData.instructor._id;
			res.json(classData);
		});
});

app.get('/api/class-history-teach/:userId', function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Instructor.findOne({userID: userId}, function(err, instructor) {
		if (!instructor) {
			res.json([]);
		}
		else {
			const instructorId = instructor._id;
			Class.find({instructor: instructorId}, function(err, classes, count) {
				res.json(classes);
			});
		}
	})
	
});

app.get('/api/class-history-take/:userId', function(req, res) {
	const studentId = new mongoose.Types.ObjectId(req.params.userId);
	UserClass
		.find({userID: studentId})
		.populate('classID')
		.exec(function (err, classData) {
			const classes = [];
			classData.forEach(c => classes.push(c.classID));
			res.json(classes);
		});
	
})

app.get('/api/my-account/:userId', function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Users.find({_id: userId}, function(err, userinfo) {
		res.json(userinfo);
	});
});

app.post('/api/create-class', function(req, res) {
	//console.log(req.body);
	const newClass = new Class({
		name: req.body.name,
        description: req.body.description,
        price: req.body.price,
		proposedSchedule: req.body.proposedSchedule,
		instructor: req.body.instructorId,
        category: req.body.category,
        rating: 0,
    	sumOfRating: 0,
    	numOfRating: 0
    });
	newClass.save((err, newclass) => {
		if (err) {
			res.json({result: err});
		}
		else {
			res.json({result: 'success'});
		}
	});
});

app.get('/api/edit-class/:classId', function(req, res) {
	//console.log(req.params.classId);
	const classId = new mongoose.Types.ObjectId(req.params.classId);
	Class.find({_id: classId},function(err, classes, count) {
		res.json(classes);
	});
});

app.post('/api/edit-class/:classId', function(req, res) {
	//console.log(req.params.classId);
	const classId = new mongoose.Types.ObjectId(req.params.classId);
	Class.findOneAndUpdate({_id: classId}, req.body, {new:true}, function(err, classes) {
		if (err) {
			res.json({result: err});
		}
		else {
			res.json({result: 'success'});
		}
	});
});

app.post('/api/register-class', function(req, res) {
	const userID = req.body.userID;
	const classID = req.body.classID;

	UserClass.find({classID: classID, userID: userID}, function(err, duplicateFound) {
		if (duplicateFound.length > 0) {
			res.json({status: 'error', result: 'you have already registered for this class.'});
		}
		else {
			const newUserClass = new UserClass({
				userID: userID,
				classID: classID
			});
			
			newUserClass.save(function(err, userClass) {
				if (err) {
					res.json({status: 'error', result: err});
				}
				else {
					res.json({status: 'success', result: 'registered for'});
				}
			});
		}
	});
});

app.post('/api/drop-class', function(req, res) {
	const userID = req.body.userID;
	const classID = req.body.classID;

	UserClass.findOneAndDelete({classID: classID, userID: userID}, function(err, classData) {
		if (!classData) {
			res.json({status: 'error', result: 'you have not registered for this class yet.'});
		}
		else {
			res.json({status: 'success', result: 'dropped from'})
		}
	});
});

app.post('/api/my-account/:userId', function(req, res) {
	//console.log(req.params.userId);
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Users.findOneAndUpdate({_id: userId}, req.body, {new:true}, function(err, users) {
		if (err) {
			res.json({result: err});
		}
		else {
			res.json({result: 'success'});
		}
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


*/

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);

/*
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

app.get('/api/Insturctor/:InstructorId', function(req, res) {
	console.log(req.params.InstructorId);
	const classId = new mongoose.Types.ObjectId(req.params.InstructorId);
	Class.find({_id: InstructorId},function(err, classes, count) {
		res.json(Instructor);
	});
});
*/

app.listen(9000);

module.exports = app;
