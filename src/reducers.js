export default function(state = {}, action) {
    if(action.type == "GET_OTHER_USER_INFO") {
        // console.log('reducers.js file userInfo: ', action.userInfo.data.userInfo);
        state = Object.assign({}, state, {
            userInfo: action.data.userInfo,
            friendshipStatus: {
                friendStatus: action.data.friendStatus,
                fromUserId: action.data.fromUserId,
                toUserId: action.data.toUserId
            }
        })
    }
    if(action.type == "BEGIN_FRIENDSHIP") {
        state = Object.assign({}, state, {friendStatus: action.friendStatus})
    }
    if(action.type == "ACCEPT_FRIENDSHIP") {
        state = Object.assign({}, state, {acceptFriendship: action.acceptFriendship})
    }
    if(action.type == "DELETE_FRIENDSHIP") {
        state = Object.assign({}, state, {deleteFriendship: action.deleteFriendship})
    }
    if(action.type == "GET_FRIENDS") {
        // console.log('making it INTO THIS THINGS?!', action.getFriends);
        state = Object.assign({}, state, {getFriends: action.getFriends})
    }

    if(action.type == "GET_ONLINE_USERS") {
        // console.log('//', action.onlineUsers);
        state = Object.assign({}, state, {onlineUsers: action.onlineUsers})
    }

    console.log('post socket io state stuff   ', state);

    return state
}

//then work on displaying
