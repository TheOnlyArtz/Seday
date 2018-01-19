
function init(app) {
    const server = require('http').createServer(app);
    const io = require('socket.io').listen(server);
    
    server.listen(3000);
    console.log('Server is listening on port 3000');
    
    module.exports.io = io;
    module.exports.server = server;
}

module.exports.init = init;