// import * as io from 'socket.io-client';
// import store from './start';
// import axios from './axios';
// import { getOnlineUsers } from './actions'
//
//
//
//
//
// function getSocket() {
//     let socket
//     if(!socket) {
//         socket = io.connect()
//
//
//         socket.on('connect', function() {
//             axios.get(`/connected/${socket.id}`)
//                 .then( () => console.log('we in the callback'))
//                 .catch( e => console.log("there was an error in front side socket.io connect", e))
//         })
//         //
//
//         socket.on('onlineUsers', function(results) {
//                 // console.log('FUCKING LOOK AT MEEEEEE!', results.onlineUsers);
//                 store.dispatch(getOnlineUsers(results.onlineUsers));
//                 //need to dispatch to action getOnlineUsers
//         });
//         // socket.on('userJoined', function(data) {
//         //         console.log('userJoined inside of here!');
//         // })
//         //
//         // socket.on('userLeft', function(data) {
//         //         console.log('inside the USERLEFT HERERERERE');
//         // })
//     }
//     return socket;
// }
//
// export { getSocket } ;
//
// // app.get('/connected/:socketId', function(req, res) {
// //     const ids = onlineUsers.map(id => obj.userId);
// //     myDB.getUser(ids)
// //         .then(users => {
// //             io.sockets.socket[socketId]
// //             .emit('onlineUsers', { users  })
// //         })
// // })
