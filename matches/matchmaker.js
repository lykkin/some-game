//this module will be used for matchmaking, a user profile and
//associated socket will be passed in when asked for a match, and this
//will handle the matchmaking (i.e. creating matches, which track move
//validation and such)

var cache = require('redis');
var match = require('./match');

var matchmaker = {
     
     userQueue: [],

     matches: [],

     'queueUser': function(user){
        this.userQueue.push(user);
        return this;
     },

     'dequeueUser': function(){
        return this.userQueue.shift();
     },

     'removeUser': function(user){
        this.userQueue.splice(this.userQueue.indexOf(user), 1);
        return this;
     },

     'newMatch': function(user){
        //hit this with promises to make the opponents known to
        //each other if that is needed.
        var opponent = this.matchUser(user);
        if(opponent != undefined){
            this.matches.push(new match([user, opponent]));
        }
     },

     'matchUser': function(user){
        //used for mmr matching, no mmr now, no match making needed
        if(this.userQueue.length > 0){
            return this.dequeueUser();
        }
        this.queueUser(user);
     }

     
};

module.exports = matchmaker;
