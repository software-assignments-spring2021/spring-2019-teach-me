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
});
