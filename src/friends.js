import React from 'react';
import axios from './axios';
import { connect } from 'react-redux';
import { getFriends } from './actions';
import { Link } from 'react-router';

class Friends extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(!this.props.getFriends) {
            this.props.dispatch(getFriends());
        } else {
            // console.log('component did mount friends.js', getFriends());
            this.props.getFriends();
        }
    }




    render() {
        if (!this.props.pendingFriends) {
            return null;
        }
        // const amazon = "https://s3.amazonaws.com/dogboarddog/"
        // console.log('THIS IS ACCEPTED FRIENDS : ', this.props.acceptedFriends);
        const acceptedFriends = this.props.acceptedFriends
        const pendingFriends = this.props.pendingFriends
        // console.log('this is the pending friends in my render friend.js', pendingFriends);
        const acceptedFriendsList = acceptedFriends.map(accepted => (
            <div>
                <Link to={`/user/${accepted.id}`}>
                    <img src = {accepted.pic} />
                </Link>
                 {/* <button onClick={() => this.props.acceptFriendRequest(pending.id)}>Accept</button> */}
            </div>
        ))
        const pendingFriendsList = pendingFriends.map(pending => (
            <div>
                <Link to={`/user/${pending.id}`}>
                    <img src = {pending.pic} />
                </Link>
            </div>
        )


    )
        return (
            <div>
                <h1>Accepted Friends</h1>
                {acceptedFriendsList}
                <h2>Pending Friends</h2>
                {pendingFriendsList}
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    // console.log('mapstatetoprops THINGS', state);
    return {
        pendingFriends: state.getFriends && state.getFriends.filter(friends => friends.status == "cancel"),
        acceptedFriends: state.getFriends && state.getFriends.filter(friends => friends.status == "terminate")

    }
};

const mapDispatchToProps = (dispatch) => ({
    getFriends: () => dispatch(getFriends())

})

export default connect(mapStateToProps, mapDispatchToProps)(Friends)
