//this module will be used for matchmaking, a user profile and
//associated socket will be passed in when asked for a match, and this
//will handle the matchmaking (i.e. holding map data for validation of
//client moves and such)

var cache = require('redis');

var matchmaker = {
     
     queue: [],

     'queueUser': function(user){
        this.queue.push(user);
        return this;
     },

     'dequeueUser': function(){
        return this.queue.shift();
     },

     'removeUser': function(user){
        this.queue.splice(this.queue.indexOf(user), 1);
        return this;
     },

     'matchUser': function(user){
        //used for mmr matching, no mmr now, no match making needed
        if(this.queue.length > 0){
            return this.dequeueUser();
        }
        this.queueUser(user);
     }

     
};

module.exports = matchmaker;
