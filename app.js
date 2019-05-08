const express = require("express");
const path = require("path");
const db = require("./db");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const Class = mongoose.model("Class");
const Users = mongoose.model("users");
const UserClass = mongoose.model("UserClass");
const app = express();

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: "user-profile",
	allowedFormats: ["jpg", "png"],
	transformation: [{ width: 110, height: 110, crop: "limit" }]
});

const parser = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "build")));

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

app.get("/about", function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/instructor/:userId/info", function(req, res) {
	const userId = req.params.userId;
	Users.find({ _id: userId }, function(err, info) {
		res.json(info);
	});
});

app.get("/api/instructor/:userId/comments", function(req, res) {
	const instructorId = req.params.userId;
	const comments = [];
	Class.find({ instructor: instructorId }, function(err, classes) {
		res.json(classes);
	});
});

app.get("/api/comments/:classId", function(req, res) {
	const classId = req.params.classId;
	UserClass.find({ classID: classId })
		.populate("userID")
		.exec(function(err, data) {
			const comments = [];
			for (let item of data) {
				if (item.comment !== null) {
					const comment = {};
					comment.userID = item.userID._id;
					comment.name = item.userID.name;
					comment.commentText = item.comment;
					comment.userProfilePic = item.userID.profilePicURL;

					const yr = item.commentDate.getFullYear();
					const mo = item.commentDate.getMonth() + 1;
					const day = item.commentDate.getDate();
					const newDate = yr + "-" + mo + "-" + day;
					comment.commentDate = newDate;

					comments.push(comment);
				}
			}

			//console.log(comments);
			res.json(comments);
		});
});

app.get("/api/classes", function(req, res) {
	Class.find({})
		.populate("instructor")
		.exec(function(err, classes, count) {
			const returnValue = [];
			for (let i = 0; i < classes.length; i++) {
				if (classes[i].archive === false) {
					const classAvailable = classes[i].toObject();

					classAvailable.instructorName = classAvailable.instructor.name;
					classAvailable.instructorProfilePic = classAvailable.instructor.profilePicURL;

					classAvailable.rating = 'Not Available';
					if (classAvailable.numOfRating > 0) {
						classAvailable.rating = (classAvailable.sumOfRating / classAvailable.numOfRating).toFixed(2);
					}

					returnValue.push(classAvailable);
				}
			}
			res.json(returnValue);
		});
});

app.get("/api/classes/featured", function(req, res) {
	Class.find({})
		.populate("instructor")
		.exec(function(err, classes, count) {
			const allClasses = [];
			
			for (let i = 0; i < classes.length; i++) {
				if (classes[i].archive === false) {
					const classAvailable = classes[i].toObject();

					classAvailable.instructorName = classAvailable.instructor.name;
					classAvailable.instructorProfilePic = classAvailable.instructor.profilePicURL;

					classAvailable.rating = 'Not Available';
					if (classAvailable.numOfRating > 0) {
						classAvailable.rating = (classAvailable.sumOfRating / classAvailable.numOfRating).toFixed(2);
					}

					allClasses.push(classAvailable);
				}
			}

			const max = allClasses.length;
			const returnValue = []
			const r1 = Math.floor(Math.random() * Math.floor(max));
			let r2 = -1;
			do {
				r2 = Math.floor(Math.random() * Math.floor(max));
			}
			while (r2 === r1)

			returnValue.push(allClasses[r1]);
			returnValue.push(allClasses[r2]);
			res.json(returnValue);
		});
});

app.get("/api/classes/:classId", function(req, res) {
	Class.findOne({ _id: req.params.classId })
		.populate("instructor")
		.exec(function(err, classData) {
			if (err) {
				console.log(err);
			}
			classData = classData.toObject();
			classData.instructorName = classData.instructor.name;
			classData.instructorID = classData.instructor._id;
			classData.instructorProfilePic = classData.instructor.profilePicURL;
			classData.instructor.password = null;
			classData.rating = undefined;
			
			if (classData.numOfRating > 0) {
				classData.rating = (classData.sumOfRating / classData.numOfRating).toFixed(2);
			}

			/*
			var rating = 0;
			if (classData.sumOfRating >= 0 && classData.numOfRating >= 0) {
				rating = classData.sumOfRating / classData.numOfRating;
				if (Number.isNaN(rating)) {
					rating = 0;
				}
			}
			classData.rating = rating;
			*/

			if (!(classData.sumOfRating >= 0)) {
				classData.sumOfRating = 0;
			}

			if (!(classData.numOfRating >= 0)) {
				classData.numOfRating = 0;
			}
			
			res.json(classData);
		});
});

app.get("/api/get-students/:classId", function(req, res) {
	UserClass.find({ classID: req.params.classId })
		.populate("userID")
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
				const newDate = yr + "-" + mo + "-" + day;
				newStudent.date = newDate;
				returnValue.push(newStudent);
			}
			//console.log(returnValue);
			res.json(returnValue);
		});
});

app.get("/api/class-history-teach/:userId", function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	const instructorId = userId;
	Class.find({ instructor: instructorId })
		.populate("instructor")
		.exec(function(err, classes, count) {
			const returnValue = [];
			for (let i = 0; i < classes.length; i++) {
				const classAvailable = classes[i].toObject();
				classAvailable.instructorName = classAvailable.instructor.name;
				classAvailable.instructorProfilePic = classAvailable.instructor.profilePicURL;

				classAvailable.rating = 'Not Available';
				if (classAvailable.numOfRating > 0) {
					classAvailable.rating = (classAvailable.sumOfRating / classAvailable.numOfRating).toFixed(2);
				}

				returnValue.push(classAvailable);
			}

			res.json(returnValue);
		});
});

//DEPRECATED - now all classes are fetched from the same api &
//filtering is now done at the front end
/*
app.get("/api/class-history-taught/:userId", function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	const instructorId = userId;
	Class.find({ instructor: instructorId }, function(err, classes, count) {
		const returnValue = [];
		for (let i = 0; i < classes.length; i++) {
			if (classes[i].archive === true) {
				const classAvailable = classes[i].toObject();
				returnValue.push(classAvailable);
			}
		}
		res.json(returnValue);
	});
});
*/

app.get("/api/class-history-take/:userId", function(req, res) {
	const studentId = new mongoose.Types.ObjectId(req.params.userId);
	UserClass.find({ userID: studentId })
		.populate({
			path: "classID",
			populate: { path: "instructor" }
		})
		.exec(function(err, classData) {
			const classes = [];
			const returnValue = [];

			//console.log(classData);
			for (let i = 0; i < classData.length; i++) {
				const classObj = classData[i].toObject();
				console.log(classObj);
				const c = classObj.classID;
				//console.log(c);
				c.complete = classObj.complete;
				classes.push(c);
			}

			for (let i = 0; i < classes.length; i++) {
				const classAvailable = classes[i];
				classAvailable.instructorName = classAvailable.instructor.name;
				classAvailable.instructorProfilePic = classAvailable.instructor.profilePicURL;

				classAvailable.rating = 'Not Available';
				if (classAvailable.numOfRating > 0) {
					classAvailable.rating = (classAvailable.sumOfRating / classAvailable.numOfRating).toFixed(2);
				}

				returnValue.push(classAvailable);
			}

			res.json(returnValue);
		});
});

//DEPRECATED - now all classes are fetched from the same api &
//filtering is now done at the front end
/*
app.get("/api/class-history-took/:userId", function(req, res) {
	const studentId = new mongoose.Types.ObjectId(req.params.userId);
	UserClass.find({ userID: studentId })
		.populate("classID")
		.exec(function(err, classData) {
			const classes = [];
			const returnValue = [];
			classData.forEach(c => classes.push(c.classID));
			for (let i = 0; i < classes.length; i++) {
				if (classData[i].complete === true) {
					const classAvailable = classes[i].toObject();
					returnValue.push(classAvailable);
				}
			}
			res.json(returnValue);
		});
});
*/

app.post("/api/comments/:classId/:userId", function(req, res) {
	const classId = req.params.classId;
	const userId = req.params.userId;
	const comment = req.body.commentText;
	UserClass.findOne({ classID: classId, userID: userId }, function(
		err,
		data
	) {
		if (!data) {
			res.json({
				status: "error",
				result: "you have not registered for this class"
			});
		} else {
			if (data.comment !== null) {
				res.json({
					status: "error",
					result:
						"you have already submitted your comment for this class"
				});
			} else {
				data.comment = comment;
				data.commentDate = new Date();
				data.save(() => {
					res.json({ status: "success" });
				});
			}
		}
	});
});

app.get("/api/my-account/:userId", function(req, res) {
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Users.find({ _id: userId }, function(err, userinfo) {
		const returnuser = [];
		const returnValue = userinfo[0].toObject();
		returnValue.instructorRating = undefined;
		returnValue.learnerRating = undefined;

		if (returnValue.numOfRatingAsInstructor > 0) {
			returnValue.instructorRating = (returnValue.sumOfRatingAsInstructor / returnValue.numOfRatingAsInstructor).toFixed(2);
		}

		if (returnValue.numOfRatingAsLearner > 0) {
			returnValue.learnerRating = (returnValue.sumOfRatingAsLearner / returnValue.numOfRatingAsLearner).toFixed(2);
		}

		//console.log(returnValue);
		returnuser.push(returnValue);
		res.json(returnuser);
	});
});

app.post("/api/create-class", function(req, res) {
	//console.log(req.body);
	const newClass = new Class({
		name: req.body.name,
		about: req.body.about,
		description: req.body.description,
		price: req.body.price,
		proposedSchedule: req.body.proposedSchedule,
		instructor: req.body.instructorId,
		category: req.body.category,
		rating: 0,
		sumOfRating: 0,
		numOfRating: 0,
		archive: false,
		paymentLink: req.body.paymentLink || ""
	});
	newClass.save((err, newclass) => {
		if (err) {
			res.json({ result: err });
		} else {
			res.json({ result: "success", newClassID: newclass._id });
		}
	});

	Users.find({ _id: req.body.instructorId }, function(err, users, count) {
		const newUser = users[0].toObject();
		// if numOfRatingAsInstructor is null or negative
		if (!(newUser.numOfRatingAsInstructor >= 0)) {
			Users.findOneAndUpdate(
				{ _id: req.body.instructorId },
				{ sumOfRatingAsInstructor: 0, numOfRatingAsInstructor: 0 },
				{ new: true },
				function(err, classes) {
					if (err) {
						console.log("fail");
					} else {
						console.log("success");
					}
				}
			);
		}
	});
});

app.get("/api/edit-class/:classId", function(req, res) {
	//console.log(req.params.classId);
	const classId = new mongoose.Types.ObjectId(req.params.classId);
	Class.find({ _id: classId }, function(err, classes, count) {
		res.json(classes);
	});
});

app.post("/api/edit-class/:classId", function(req, res) {
	//console.log(req.params.classId);
	const classId = new mongoose.Types.ObjectId(req.params.classId);
	Class.findOneAndUpdate({ _id: classId }, req.body, { new: true }, function(
		err,
		classes
	) {
		if (err) {
			res.json({ result: err });
		} else {
			res.json({ result: "success" });
		}
	});
});

app.post("/api/delete-class/:classId", function(req, res) {});

app.post("/api/register-class", function(req, res) {
	const userID = req.body.userID;
	const classID = req.body.classID;

	UserClass.find({ classID: classID, userID: userID }, function(
		err,
		duplicateFound
	) {
		if (duplicateFound.length > 0) {
			if (duplicateFound[0].complete === true) {
				res.json({
					status: "error",
					result: "you have already completed this class"
				});
			} else {
				res.json({
					status: "error",
					result: "you have already registered for this class."
				});
			}
		} else {
			let instructorEmail = "Please contact us to reach your instructor";
			Class.findOne({ _id: classID }, function(err, classes) {
				if (err) {
					console.log(err);
				} else {
					Users.findOne({ _id: classes.instructor }, function(
						err,
						instructors
					) {
						if (err) {
							console.log(err);
						} else {
							instructorEmail = `Please contact your new instructor at ${
								instructors.email
							}`;
						}

						const newUserClass = new UserClass({
							userID: userID,
							classID: classID,
							complete: false
						});

						newUserClass.save(function(err, userClass) {
							if (err) {
								res.json({ status: "error", result: err });
							} else {
								res.json({
									status: "success",
									result: "registered for",
									instructorEmail: instructorEmail
								});
							}
						});
					});
				}
			});
		}
	});
});

app.post("/api/drop-class", function(req, res) {
	const userID = req.body.userID;
	const classID = req.body.classID;

	UserClass.findOneAndDelete({ classID: classID, userID: userID }, function(
		err,
		classData
	) {
		if (!classData) {
			res.json({
				status: "error",
				result: "you have not registered for this class yet."
			});
		} else {
			res.json({ status: "success", result: "dropped" });
		}
	});
});

app.post("/api/archive-class", function(req, res) {
	const classID = req.body.classID;
	Class.findOneAndUpdate({ _id: classID }, req.body, { new: true }, function(
		err,
		classes
	) {
		if (err) {
			res.json({ result: err });
		} else {
			res.json({ status: "success", result: "archived" });
		}
	});
});

app.post("/api/complete-class", function(req, res) {
	const classID = req.body.classID;
	const userID = req.body.userID;
	UserClass.findOneAndUpdate(
		{ classID: classID, userID: userID },
		req.body,
		{ new: true },
		function(err, classData) {
			if (!classData) {
				res.json({
					status: "error",
					result: "you have not registered for this class yet."
				});
			} else {
				res.json({ status: "success", result: "completed" });
			}
		}
	);
});

app.post("/api/my-account/:userId", function(req, res) {
	//console.log(req.params.userId);
	const userId = new mongoose.Types.ObjectId(req.params.userId);
	Users.findOneAndUpdate({ _id: userId }, req.body, { new: true }, function(
		err,
		users
	) {
		if (err) {
			res.json({ result: err });
		} else {
			res.json({ result: "success" });
		}
	});
});

app.get("/api/instructors", function(req, res) {
	Class
		.find({})
		.populate('instructor')
		.exec(function(err, classes, count) {
			const instructors = [];
			for (let i = 0; i < classes.length; i++) {
				const temp = classes[i].toObject();
				const instructor = temp.instructor;
				instructor.numOfRatingAsInstructor < 1 ? instructor.rating = 'Not Available' : instructor.rating = (instructor.sumOfRatingAsInstructor / instructor.numOfRatingAsInstructor).toFixed(2);
				instructors.push(instructor);
			}

			const uniqueID = []
			const uniqueInstructors = [];
			
			//removing duplicates in array
			for (let i = 0; i < instructors.length; i++) {
				const current = instructors[i];
				const currentID = current._id;
				if (uniqueID.indexOf(currentID.toString()) === -1) {
					uniqueID.push(currentID.toString());
					uniqueInstructors.push(current);
				}
			}

			res.json(uniqueInstructors);
		});
});

app.get("/api/instructors/featured", function(req, res) {
	Class
		.find({})
		.populate('instructor')
		.exec(function(err, classes, count) {
			const instructors = [];
			for (let i = 0; i < classes.length; i++) {
				const temp = classes[i].toObject();
				const instructor = temp.instructor;
				instructor.numOfRatingAsInstructor < 1 ? instructor.rating = 'Not Available' : instructor.rating = (instructor.sumOfRatingAsInstructor / instructor.numOfRatingAsInstructor).toFixed(2);
				instructors.push(instructor);
			}

			const uniqueID = []
			const uniqueInstructors = [];
			
			//removing duplicates in array
			for (let i = 0; i < instructors.length; i++) {
				const current = instructors[i];
				const currentID = current._id;
				if (uniqueID.indexOf(currentID.toString()) === -1) {
					uniqueID.push(currentID.toString());
					uniqueInstructors.push(current);
				}
			}

			const max = uniqueInstructors.length;
			const returnValue = []
			const r1 = Math.floor(Math.random() * Math.floor(max));
			let r2 = -1;
			do {
				r2 = Math.floor(Math.random() * Math.floor(max));
			}
			while (r2 === r1)

			returnValue.push(uniqueInstructors[r1]);
			returnValue.push(uniqueInstructors[r2]);
			res.json(returnValue);
		});
});

app.post("/api/images/:userId", parser.single("profile-pic"), (req, res) => {
	//console.log(req.file) // to see what is returned to you

	Users.findById(req.params.userId, function(err, user) {
		user.profilePicURL = req.file.url;
		user.profilePicPublicID = req.file.public_id;
		user.save((err, modifiedUser) => {
			if (err) {
				res.json({ result: err });
			} else {
				res.json({ result: "success" });
			}
		});
	});
});

app.post("/api/rate-learner", function(req, res) {
	//console.log(req.body);

	UserClass.find({ userID: req.body.userId })
		.populate({
			path: "classID",
			populate: { path: "instructor" }
		})
		.exec(function(err, classData) {
			var isInstructor = false;

			for (let i = 0; i < classData.length; i++) {
				const classObj = classData[i].toObject();
				// console.log(classObj.classID.instructor._id);
				if (req.body.instructorId == classObj.classID.instructor._id) {
					//console.log("is instructor");
					isInstructor = true;
					break;
				}
			}

			// console.log(isInstructor);

			if (isInstructor) {
				Users.findOneAndUpdate(
					{ _id: req.body.userId },
					{
						sumOfRatingAsLearner: req.body.newSumOfRatingAsLearner,
						numOfRatingAsLearner: req.body.newNumOfRatingAsLearner
					},
					{ new: true },
					function(err, classes) {
						if (err) {
							res.json({
								status: "error",
								result: err
							});
						} else {
							res.json({ status: "success" });
						}
					}
				);
			} else {
				res.json({
					status: "error",
					result: "you are not an instructor of the student"
				});
			}
		});
});

app.post('/api/rate-class', function(req, res) {
	// console.log(req.body);

	UserClass.findOne({ classID: req.body.classId, userID: req.body.userId }, function(
		err,
		data
	) {
		if (!data) {
			res.json({
				status: "error",
				result: "you have not registered for this class"
			});
		} else {
			Class.findOneAndUpdate({ _id: req.body.classId }, {sumOfRating:req.body.newSumOfRating,numOfRating:req.body.newNumOfRating}, { new: true }, function(
				err,
				classes
			) {
				if (err) {
					res.json({
						status: "error",
						result:
							err
					});
				} else {
					res.json({ status: "success" }); //return new rating here
				}
			});
		}
	});
});

app.post("/api/rate-instructor", function(req,res) {
	//console.log(req.body);

	UserClass
		.find({userID: req.body.userId})
		.populate({
			path: 'classID',
			populate: {path: 'instructor'}
		})
		.exec(function (err, classData) {

		 var isStudent = false;

		 for (let i = 0; i < classData.length; i++) {
			 const classObj = classData[i].toObject();

			 if(req.body.instructorId == classObj.classID.instructor._id) {
				 isStudent = true;
				 break;
			 }
		 }

		 if (isStudent) {
			 Users.findOneAndUpdate({_id: req.body.instructorId}, {sumOfRatingAsInstructor:req.body.newSumOfRatingAsInstructor,numOfRatingAsInstructor:req.body.newNumOfRatingAsInstructor}, {new:true}, function(err, classes) {
				 if (err) {
					 res.json({
						 status: "error",
						 result:
							 err
					 });
				 } else {
					 res.json({ status: "success" });
				 }
			 });
		 }
		 else {
			 res.json({
				 status: "error",
				 result:
					 "you are not an student of the instructor"
			 });
		 }
	});

});


app.get("/*", function(req, res) {
	res.sendFile(path.join(__dirname, "build", "index.html"));
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
