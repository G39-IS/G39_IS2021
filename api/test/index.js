var test = require('tape');
var request = require('supertest');
var app = require('../');

test('Correct user returned', function (assert) {
    request(app)
        .get('/api/user')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            var expectedUsers = {
                "Users": [
                    {
                        "ID" : 1,
                        "Nome": "Marco",
                        "Cognome": "Piervilla",
                        "User": "Marco_Pier",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    }
                ]
            };
            assert.error(err, 'No error');
            assert.same(res.body, expectedUsers, 'User as expected');
            assert.end();
        });
});

test('Correct user returned', function (assert) {
    request(app)
        .get('/api/userbyid/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
            var expectedUsers = 
              
                    {
                        "ID" : 1,
                        "Nome": "Marco",
                        "Cognome": "Piervilla",
                        "User": "Marco_Pier",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    };
            
                
      
            assert.error(err, 'No error');
            assert.same(res.body, expectedUsers, 'User as expected');
            assert.end();
        });
});