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
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.get('/api/instructor/:userId/info', function(req, res) {
	const userId = req.params.userId;
	console.log(userId);
	Users.find({_id: userId}, function(err, info) {
		res.json(info);
	});
});

app.get('/api/classes', function(req, res) {
	Class.find({}, function(err, classes, count) {
		const returnValue = [];
		for (let i = 0; i < classes.length; i++) {
			if(classes[i].archive == false) {
				const classAvailable = classes[i].toObject();
				returnValue.push(classAvailable);
			}
		}
		res.json(returnValue);
	});
});

app.get('/api/classes/:classId', function(req, res) {
	Class
		.findOne({_id: req.params.classId})
		.populate('instructor')
		.exec(function(err, classData) {
			if (err) {
				console.log(err)
			}
			classData = classData.toObject();
			classData.instructorName = classData.instructor.name;
			classData.instructorID = classData.instructor._id;
			classData.instructor.password = null;
			res.json(classData);
		});
});

app.get('/api/get-students/:classId', function(req, res) {
	UserClass
		.find({classID: req.params.classId})
		.populate('userID')
		.exec(function(err, students) {
			if (err) {
				console.log(err);
			}

			const returnValue = [];
			for (let i = 0; i < students.length; i++) {
				const newStudent = students[i].toObject();
				const yr = newStudent.date.getFullYear();
				const mo = newStudent.date.getMonth() + 1;
				const day = newStudent.date.getDate();
				const newDate = yr + '-' + mo + '-' + day;
				newStudent.date = newDate;
				returnValue.push(newStudent);
			}
			//console.log(returnValue);
			res.json(returnValue);
		})
})

app.get('/api/class-history-teach/:userId', function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	const instructorId = userId;
	Class.find({instructor: instructorId}, function(err, classes, count) {
		const returnValue = [];
		for (let i = 0; i < classes.length; i++) {
			if(classes[i].archive == false) {
				const classAvailable = classes[i].toObject();
				returnValue.push(classAvailable);
			}
		}
		res.json(returnValue);
	});
});

app.get('/api/class-history-take/:userId', function(req, res) {
	const studentId = new mongoose.Types.ObjectId(req.params.userId);
	UserClass
		.find({userID: studentId})
		.populate('classID')
		.exec(function (err, classData) {
			const classes = [];
			const returnValue = [];
			classData.forEach(c => classes.push(c.classID));
			for (let i = 0; i < classes.length; i++) {
				if(classes[i].archive == false && classData[i].complete == false) {
					const classAvailable = classes[i].toObject();
					returnValue.push(classAvailable);
				}
			}
			res.json(returnValue);
		});
})

app.get('/api/my-account/:userId', function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Users.find({_id: userId}, function(err, userinfo) {
		const returnuser = [];
		const returnValue = userinfo[0].toObject();
		if(returnValue.numOfRatingAsInstructor>=0) {
			var instructorRating = returnValue.sumOfRatingAsInstructor * 1.0 /
			returnValue.numOfRatingAsInstructor;
			if(Number.isNaN(instructorRating)) {
				instructorRating = 0;
			}
			returnValue.instructorRating = instructorRating;
		}
		if(returnValue.numOfRatingAsLearner>=0) {
			var learnerRating = returnValue.sumOfRatingAsLearner * 1.0 /
			returnValue.numOfRatingAsLearner;
			if(Number.isNaN(learnerRating)) {
				learnerRating = 0;
			}
			returnValue.learnerRating = learnerRating;
		}
		returnuser.push(returnValue);
		res.json(returnuser);
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
    	numOfRating: 0,
			archive: false
    });
	newClass.save((err, newclass) => {
		if (err) {
			res.json({result: err});
		}
		else {
			res.json({result: 'success'});
		}
	});

	Users.find({_id: req.body.instructorId}, function(err, users, count) {
		const newUser = users[0].toObject();
		// if numOfRatingAsInstructor is null or negative
		if (!(newUser.numOfRatingAsInstructor >= 0)){
			Users.findOneAndUpdate({_id: req.body.instructorId}, {sumOfRatingAsInstructor:0,numOfRatingAsInstructor:0}, {new:true}, function(err, classes) {
				if (err) {
					console.log("fail");
				}
				else {
					console.log("success");
				}
			});
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

app.post('/api/delete-class/:classId', function(req, res) {

});

app.post('/api/register-class', function(req, res) {
	const userID = req.body.userID;
	const classID = req.body.classID;

	UserClass.find({classID: classID, userID: userID}, function(err, duplicateFound) {
		if (duplicateFound.length > 0) {
			if(duplicateFound[0].complete == true) {
				res.json({status: 'error', result: 'you have already completed this class'});
			}
			else{res.json({status: 'error', result: 'you have already registered for this class.'});}
		}
		else {
			const newUserClass = new UserClass({
				userID: userID,
				classID: classID,
				complete: false
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

app.post('/api/archive-class', function(req, res) {
	const classID = req.body.classID;
	Class.findOneAndUpdate({_id:classID}, req.body, {new:true}, function(err, classes){
		if(err) {
			res.json({result: err});
		}
		else {
			res.json({result: 'success'});
		}
	});

});

app.post('/api/complete-class', function(req, res) {
	const classID = req.body.classID;
	const userID = req.body.userID;
	UserClass.findOneAndUpdate({classID:classID, userID: userID}, req.body, {new:true}, function(err, classData){
		if (!classData) {
			res.json({status: 'error', result: 'you have not registered for this class yet.'});
		}
		else {
			res.json({status: 'success', result: 'complete'})
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

app.get('/api/instructors', function(req, res) {
	Users.find({}, function(err, users, count) {
		const returnValue = [];
		for (let i = 0; i < users.length; i++) {
			const newUser = users[i].toObject();
			if (newUser.numOfRatingAsInstructor >= 0){
				var rating = newUser.sumOfRatingAsInstructor / newUser.numOfRatingAsInstructor;
				if (Number.isNaN(rating)){
					rating = 0;
				}
				newUser.rating = rating;
				returnValue.push(newUser);
			}
		}
		res.json(returnValue);
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
