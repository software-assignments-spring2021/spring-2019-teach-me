const request = require('supertest');
const app = require('../app');

describe('the server', function() {
	it('should respond to a request for / with a html document', function (done) {
		request(app)
			.get('/')
			.set('Accept', 'text/html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});

	it('should repsond to /api/classes with response type json', function (done) {
		request(app)
			.get('/api/classes')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});

	it('should respond to a request for /teach-others with a html document', function (done) {
	request(app)
		.get('/teach-others')
		.set('Accept', 'text/html')
		.expect('Content-Type', /html/)
		.expect(200, done);
	});

	it('shoud respond to /about with a html document', function(done) {
		request(app)
			.get('/about')
			.set('Accept', 'text/html')
			.expect('Content-Type', /html/)
			.expect(200, done);
	});




});
