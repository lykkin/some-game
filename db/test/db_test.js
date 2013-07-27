var assert = require('assert');
var db = require('../db.js');

describe('Users', function(){
    it('should be able to be added and deleted', function(done){
        db.createUser({name:'test'}, function(err, user){
            assert.notEqual(user, undefined);
            assert.notEqual(user, false);
            db.removeUser(user, function(err){
                assert.equal(err, undefined);
                done();
            });
        });
    });

    it('should be able to be found', function(done){
        db.createUser({name:'test'}, function(err, user){
            db.findUser(user, function(err, founduser){
                assert.deepEqual(founduser._id, user._id);
                done();
            });
        });
    });
});

describe('Units', function(){
    
});
