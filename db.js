const mongoose = require('mongoose');
const users = require("./routes/api/users");
const Users = mongoose.model('users');

/*
const testUserSchema = new mongoose.Schema ({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    class: String,
    rating: Number,
    sumOfRating: Number,
    numOfRating: Number
});

const TestUser =  mongoose.model('TestUser', testUserSchema);
*/

/*
WARNING: deprecated in favor of unification between users and instructors.
const InstructorSchema = new mongoose.Schema ({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    introduction: String,
    credentials: String,
    rating: Number,
    sumOfRating: Number,
    numOfRating: Number
})*/

const classSchema = new mongoose.Schema ({
    name: String,
    about: String, //long description of the class
    description: String, //short description of the class
    price: Number,
    proposedSchedule: String,
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    category: String,
    sumOfRating: Number,
    numOfRating: Number,
    archive: Boolean,
    paymentLink: String
});

const userClassSchema = new mongoose.Schema ({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    classID: {type: mongoose.Schema.Types.ObjectId, ref: 'Class'},
    date: {
        type: Date,
        default: Date.now
    },
    complete: Boolean,
    comment: {
        type: String,
        default: null
    },
    commentDate: {
        type: Date,
        default: null
    }
})

const Class =  mongoose.model('Class', classSchema);
//const Instructor = mongoose.model('Instructor', InstructorSchema);
const UserClass = mongoose.model('UserClass', userClassSchema);

const dbconf = process.env.DB_URI;
mongoose.connect(dbconf, { useNewUrlParser: true });
