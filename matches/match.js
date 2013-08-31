var match = function(userList){
    
    userList.forEach(function(socket){
        socket.emit('matchFound');
        socket.on('move', function(moveData){
            userList.forEach(function(opponent){
                if(opponent != socket){
                    opponent.emit('move', moveData);
                }
            });
        });
    });

    return {

        players: userList == undefined ? [] : userList
     
     };


}

module.exports = match;
