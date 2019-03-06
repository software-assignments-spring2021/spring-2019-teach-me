const express = require('express');
const path = require('path');
const db = require('./db');
const mongoose = require('mongoose');

const Testclass = mongoose.model('Testclass');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/classes', function(req, res) {
	Testclass.find({}, function(err, testclasses, count) {
		res.json(testclasses);
	});
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Temporary
app.get('/teach-others', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/about', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//Temp
app.get('/payment', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(9000);

module.exports = app;
