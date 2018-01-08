import React from 'react';
import axios from './axios';
import { connect } from 'react-redux';
import { getOtherUserInfo, beginFriendship, acceptFriendship, deleteFriendship } from './actions'

class OtherUserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const id = this.props.params.id
        // if (!this.props.getOtherUserInfo) {
        //     this.props.dispatch(getOtherUserInfo(id));
        // } else {
            this.props.getOtherUserInfo(id);
        // }
    }

    render() {
        if(!this.props.otherUserInfo) {
            console.log('no user info here');
            return null;
        }

        let button;
        const {otherUserInfo, friendshipStatus} = this.props

        // console.log('other-user-profile component of the Render, otherUserInfo: ', otherUserInfo);
        // console.log('other-user-profile component of the Render, friendshipStatus:  ', friendshipStatus.friendStatus);
        if ( !friendshipStatus.friendStatus) {
            // make friend request
            console.log('rendering button Dog Friend Request other-user-profile.js');
             button = <button onClick={() => this.props.beginFriendship(this.props.params.id)}>Dog Friend Request</button>

        } else if (friendshipStatus.friendStatus == 'cancel' ) {

            if (this.props.params.id == friendshipStatus.fromUserId) {
                button = (
                    <div>
                        <button onClick={() => this.props.deleteFriendship(this.props.params.id)}>Cancel Request</button>
                        <button onClick={() => this.props.acceptFriendship(this.props.params.id)}>Accept Dogship</button>
                    </div>
                )
            } else {
                console.log("rendering button for cancelling request");
                button = <button onClick={() => this.props.deleteFriendship(this.props.params.id)}>Cancel Request</button>
            }
            // if (friendshipStatus.friendStatus == 'terminate') {
            //     // end friendship button
            //     button = <button onClick={() => this.props.deleteFriendship(this.props.params.id)}>Delete Friendship</button>
            // } //likely pointless because it's inside the else if of the other guy above.
        } else if (friendshipStatus.friendStatus == 'terminate') {
            console.log('friendship status should be terminate here: ');
            button = <button onClick={() => this.props.deleteFriendship(this.props.params.id)}>Delete Friendship</button>

        }

        return (
            <div>

                <h1>Other User Profile! Wow!</h1>
                <img src={otherUserInfo.pic} id="profile-pic"/>
                <p>{otherUserInfo.bio}</p>
                {button}

            </div>
        )
    }
}


const mapStateToProps = function(state) {
    // console.log('running map state to props in other user profile', state);
    return {
        otherUserInfo: state.userInfo,
        friendshipStatus: state.friendshipStatus
    }
};


const mapDispatchToProps = (dispatch) => ({
     getOtherUserInfo: (otherUserId) => dispatch(getOtherUserInfo(otherUserId)),
     beginFriendship: (id) => dispatch(beginFriendship(id)),
     acceptFriendship: (id) => dispatch(acceptFriendship(id)),
     deleteFriendship: (id) => dispatch(deleteFriendship(id)),
})



export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile)
