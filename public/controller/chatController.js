const io = require('socket.io');
module.exports = function(io){
    io.sockets.on('connection',function(socket){
        console.log("Connected one")
        console.log(socket)
        //connections.push(socket);
        console.log('Connected: %s sockets connected',connections.length);
       
    //    socket.on('disconnect',function(data){
    //         // if(!socket.username) return;
    //          users.splice(users.indexOf(socket.username),1);
    //          updateUsernames();
    //        connections.splice(connections.indexOf(socket),1);
    //        console.log('Disonnected: %s sockets disconnected',connections.length);
    //    });
    })
}