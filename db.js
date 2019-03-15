const mongoose = require('mongoose');

const testclassSchema = new mongoose.Schema ({
    name: String,
    price: Number,
    instructor: String
});

const Testclass =  mongoose.model('Testclass', testclassSchema);


const classSchema = new mongoose.Schema ({
    name: String,
    description : String,
    price: Number,
    proposedSchedule: String,
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'Instructor'},
    category: String,
    rating: Number,
    sumOfRating: Number,
    numOfRating: Number
});

const Class =  mongoose.model('Class', classSchema);


const dbconf = process.env.DB_URI;
mongoose.connect(dbconf, { useNewUrlParser: true });


