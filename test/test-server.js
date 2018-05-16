var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('zappy', function() {
    it('should list ALL tweets on /twitter GET', function(done) {
        chai.request(server)
            .get('/twitter/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should update slack messages  on /slack/seed POST', function(done) {
        chai.request(server)
            .post('/slack/seed/')
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });
});