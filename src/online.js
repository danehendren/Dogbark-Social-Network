import React from 'react';
import axios from './axios';
import { connect } from 'react-redux';
// import { getSocket } from './socket';
import { Link } from 'react-router';

class Online extends React.Component {
    constructor(props) {
        super(props)

    }

    // componentDidMount() {
    //
    // }

    render() {
        if( !this.props.onlineUsers) {
            return (
                <div>
                    <h1>Loading Bud</h1>
                </div>
            )
                // let onlineUsers = this.props.onlineUsers
        } else {
            const onlineUser = this.props.onlineUsers.map(onlineUser => (

                    <div>
                        <Link to={`/user/${onlineUser.id}`}>
                        <img src = {onlineUser.pic} />
                    </Link>
                    </div>
            ))

        return (
            <div>
                <h1>Online Component</h1>
                {onlineUser}
            </div>
            //map over those online  users to get this going.
        )
    }
}
}

const mapStateToProps = function(state) {
    console.log('mapStateToProps inside of it! hooray!', state);
    return {
        onlineUsers: state.onlineUsers
    }
}

// const mapDispatchToProps = (dispatch) => ({
//     getOnlineUsers: () => dispatch(getOnlineUsers())
// })

export default connect(mapStateToProps)(Online)
