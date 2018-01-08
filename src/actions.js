import axios from './axios';



export function getOtherUserInfo(id) {
    // return { type: "GET_OTHER_USER_INFO" };
    // console.log('actions.js getOtherUserInfo log: ');
    return axios.get(`/api/get-other-user-info/${id}`)
        .then(( results ) => {
            // console.log('actions.js getOtherUserInfo fn()', results.data);
            return {
                type: "GET_OTHER_USER_INFO",
                data: results.data,

             }
        })
}
export function changeFriendshipStatus() {
    return axios.get('/api/change-friendship-status')
        .then(() => console.log('cool'))
}
export function beginFriendship(id) {

    return axios.post(`/api/begin-friendship/${id}`)
        .then(() => {
            return {type: "BEGIN_FRIENDSHIP",
                    friendStatus: "cancel"
            }
        })
}
export function acceptFriendship(id) {

    return axios.post(`/api/accept-friendship/${id}`)
        .then(() => {
            return {type: "ACCEPT_FRIENDSHIP"}
        })
}
export function deleteFriendship(id) {

    return axios.post(`/api/delete-friendship/${id}`)
        .then(() => {
            return {type: "DELETE_FRIENDSHIP"}
        })
}
export function getFriends() {
    // console.log('get friends action.js');
    return axios.get('/api/get-friends/')
        .then((results) => {
            // console.log('these results in getFriends axios',results.data.friends);
            return {
                type: "GET_FRIENDS",
                getFriends: results.data.friends
            }
        })
}
//==============================
export function getOnlineUsers(onlineUsers) {
    // console.log('INSIDE ACTION.JS ONLINE USERS: ', onlineUsers);
    return {
        type: "GET_ONLINE_USERS",
        onlineUsers
    }
}
