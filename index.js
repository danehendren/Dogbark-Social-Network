const express = require('express');
const app = express();
const compression = require('compression');
const cookieSession = require('cookie-session')
const morgan = require( 'morgan' );
const bp = require('body-parser')
const s3 = require('./s3')
const server = require('http').Server(app);
const io = require('socket.io')(server);
const csurf = require('csurf');

const db = require('./modules/db');




// const session = require('express-session')
// check with matt if i need this and such.
if (process.env.DATABASE_URL) {
    dbURL = process.env.DATABASE_URL
} else {
    var info = require('./configs/secrets.json')
    var user = info.username;
    var pass = info.password;
    dbURL = `postgres:${user}:${pass}psql@localhost:5432/network`
}


// HTTP request logger middleware
app.use( morgan( 'dev' ) );
// _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
//============================Multer

//=====================================
app.use(compression());
app.use(cookieSession({
    secret: 'a really hard to guess secret',
    maxAge: 1000 * 60 * 60 * 24 * 14
}));
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie('dogonaroof', req.csrfToken())
    next();
});

//=========================Test to see if in Production.
if (process.env.NODE_ENV != 'production') {
    app.use('/bundle.js', require('http-proxy-middleware')({
        target: 'http://localhost:8081/'
    }));
}

app.use('/public' , express.static(__dirname + '/public'));
//===================Routes
app.use('/api', require('./routes/api'))
//==========================================SOCKET.IO
io.on('connection', function(socket) {
    // console.log(`socket with the id ${socket.id} is now connected`);

    socket.on('disconnect', function() {
        console.log(`socket with the id ${socket.id} is now disconnected`);
    });
    // socket.emit('onlineUsers', {
    //     message: "onlineUsers message is so hip and so neat."
    // });
    // socket.emit('userJoined', {
    //
    // });
    // socket.emit('userLeft', {
    //
    // });
});
//===========================Socket Get request
let onlineUsers = [];

app.get('/connected/:socketId', (req, res) => {
    onlineUsers.push({
        userId: req.session.user.id,
        socketId: req.params.socketId
    })

    const ids = onlineUsers.map(
        user => user.userId
    );
    // console.log('LOGGIN THE IDS IN INDEX>JS ', ids);
    db.getUsersByIds(ids)
        .then(results => {

            for (var i = 0; i < results.length; i++) {
                results[i]
                results[i].pic = "https://s3.amazonaws.com/bark-board/" + results[i].pic
            }
            console.log('RESULTS in Index.js ', results);
            var socketId = req.params.socketId
            io.sockets.sockets[socketId].emit('onlineUsers', {
                onlineUsers: results
            })
        }).catch(err => console.log("there was an errorororororor", err))
    res.send()
})
//io.sockets.sockets above is going to happen again with chat componenet
//this is broadcasting that emit to the individual users.
//===============================CHAT SOCKET io
// app.get('/')





//=========================
app.get('/welcome/', (req, res) => {
    // console.log("inside /welcome whatever", req.session);
    if (req.session.user) {
        // console.log('inside the welcome get and there is req.session');
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/index.html')
    }
})

//======================= * get request to get the thing going.//this is a root request.
app.get('*', function(req, res){
    // console.log("MMMEEERRRPPPPP");
    if(!req.session.user) {
        console.log('this is my req.session.user', req.session.user);
        res.redirect('/welcome/')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//=========================Listening
server.listen(8080, function() {

})
