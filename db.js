const mongoose = require('mongoose');

const testclassSchema = new mongoose.Schema ({
    name: String,
    price: Number,
    instructor: String
});

const Testclass =  mongoose.model('Testclass', testclassSchema);


const dbconf = process.env.DB_URI;
mongoose.connect(dbconf, { useNewUrlParser: true });


