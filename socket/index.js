const {Server} = require('socket.io');

module.exports = (server) => {
    const io = new Server(server, {cors: '*'});

    let users = [];

    io.on('connection', socket => {
        const socketId = socket.id;
        const email = socket.handshake.query.email;
        users.push({socketId, email}); 
        console.log(`User ${socketId} connected.`);
        console.log(users);

        socket.emit('connection', socketId);

        socket.on('disconnect', () => {
            users = users.filter(item => item.socketId !== socketId);
            console.log(`User ${socketId} discounected.`);
            console.log(users);
        });

        socket.on('send-message', data => {
            console.log(data);
            const receiverUser = users.filter(item => item.email === data.to);
            socket.to(receiverUser[0]?.socketId).emit('onMessage', {from: email, message: data.message});
        });
    });
}
