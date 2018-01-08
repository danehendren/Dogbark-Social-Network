import React from 'react';
import axios from './axios';
import Logo from './logo';
import { Link } from 'react-router';
import ProfilePic from './profilepic';
import Profile from './profile';
import UpdateBio from './update-bio';
import { getSocket } from './socket'


export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { };

        this.logOut = this.logOut.bind(this);
    }
    logOut(e) {
    }

componentDidMount(){
    getSocket()
    axios.get('/api/get-profile-info')
    .then(({data}) => {
        this.setState({
            first: data.userInfo.first,
            last: data.userInfo.last,
            pic: data.userInfo.pic,
            id: data.userInfo.id,
            email: data.userInfo.email,
            bio: data.userInfo.bio
        })
    })
}
    render() {
        if (!this.state.first) {
            return null
        }
        const {id, first, last, bio, pic, email} = this.state;
        const children = React.cloneElement(this.props.children,
        {
            id,
            first,
            last,
            email,
            bio,
            pic
        });
        return (
            <div>
                <Logo />
                <form>
                    <button onClick={this.logOut} name="button">Log Out</button>
                </form>
                {children}
            </div>
        )
    }
}
