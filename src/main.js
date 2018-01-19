const express = require('express');
const Router = new express.Router();
const app = express();

const path = require('path')

const websocket = require('./Websocket');
const server = websocket['server'];

const DBhelpers = require('./Database');


const session = require('express-session');
const RDBstore = require('session-rethinkdb')(session);
let r = require('rethinkdbdash')({db: 'Dashcord', servers: [{host: 'localhost', port: 28015}]});
module.exports.rethink = r;

const GETRoutes = require('./routes/get.js')
const POSTRoutes = require('./routes/post.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Assets')));
app.set('view engine', 'ejs');

// Initialize websocket server
server.init(app);
const io = server['io'];

io.sockets.on('connection', (socket) => {
    socket.on('new prefix', async function (prefix, id) {
        try {
            io.sockets.emit('new prefix', prefix, id)
            await DBhelpers.guildOrInit(r, id);
            await DBhelpers.updator(r, "new prefix", prefix, id);
        } catch (e) {
            console.error(e)
        }
    })
});



// Session
let sessionStore = new RDBstore(r, {
    table: 'Sessions'
});

app.use(session({
    secret: config.dash_secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      expires: new Date(253402300000000)
    }
}));

// Get routes
app.use('/', GETRoutes);
// Post routes
app.use('/', POSTRoutes);

