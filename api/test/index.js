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
                    },
                    {
                        "ID" : 2,
                        "Nome": "Marco",
                        "Cognome": "Piertutto",
                        "User": "Marco Tutto",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,1],
                        "Follower" : 10
                    },
                    {
                        "ID" : 3,
                        "Nome": "Giulia",
                        "Cognome": "Macchia",
                        "User": "Macchigiuly",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    },
                    {
                        "ID" : 4,
                        "Nome": "Sara",
                        "Cognome": "Caligola",
                        "User": "Sara Caligola",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    },
                    {
                        "ID" : 5,
                        "Nome": "Giorgio",
                        "Cognome": "Fadel",
                        "User": "GiorgioFade",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,2],
                        "Follower" : 10
                    },
                    {
                        "ID" : 6,
                        "Nome": "Giorgia",
                        "Cognome": "Castagna",
                        "User": "CastaGio",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    },
                    {
                        "ID" : 7,
                        "Nome": "Marco",
                        "Cognome": "Caserto",
                        "User": "MCas",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" :[1,5,2],
                        "Follower" : 10
                    },
                    {
                        "ID" : 8,
                        "Nome": "Pietra",
                        "Cognome": "Martello",
                        "User": "MartePietra",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 1
                    },
                    {
                        "ID" : 9,
                        "Nome": "Giorgia",
                        "Cognome": "Murtadell",
                        "User": "aigroiG",
                        "Password":"pswd",
                        "E-mail":"email@email.e",
                        "Seguiti" : [7,5,2],
                        "Follower" : 10
                    },
                    {
                        "ID" : 10,
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