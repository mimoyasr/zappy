var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var should = chai.should();

chai.use(chaiHttp);

describe('zappy', function() {
    it('should list ALL tweets on /twitter GET', function(done) {
        chai.request(server)
            .get('http://0abe908a.ngrok.io/twitter')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
    it('should update slack messages  on /slack/seed POST', function(done) {
        chai.request(server)
            .post('http://0abe908a.ngrok.io/slack/seed')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
    });
});