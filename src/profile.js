import React from 'react';
import ProfilePic from './profilepic';
import ProfilePicUpload from './profilepicupload';
import UpdateBio from './update-bio';
import { Link } from 'react-router';


export default class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pic: this.props.pic,
            bio: this.props.bio
        };
    }


    render() {
        if (!this.state) {
            return null
        }

        const { first, last, email, id, bio } = this.props
        return (
            <div className="container">
                <h1>profile Component</h1>
                <ProfilePic first={first}
                            last={last}
                            pic={this.state.pic}/>
                <UpdateBio
                bio= {bio} />
                <ProfilePicUpload updateImage={newPic => {
                    this.setState({
                        pic: newPic
                    })
                }} />
                <Link to="/friends">Friends!</Link>
            </div>
        )
    }
}

// {/* <ProfilePicUpload
// first={first}
// last={last}
// email={email}
// id={id}
// /> */}
