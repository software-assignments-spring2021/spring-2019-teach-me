const express = require('express');
const path = require('path');
const db = require('./db');
const mongoose = require('mongoose');

const Class = mongoose.model('Class');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/classes', function(req, res) {
	Class.find({},function(err, classes, count) {
		res.json(classes);
	});
});

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000);

module.exports = app;