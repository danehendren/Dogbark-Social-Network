import React from 'react';
import axios from './axios';

export default function ProfilePic(props) {

    // let profilePicture;
    // let url = "https://s3.amazonaws.com/dogboarddog/";

    if(!props) {
        return (<div> Loading Image... </div>)
    } else {
        let {first, last, pic} = props
        let altDescription = `Profile Picture ${first} ${last}`;
        return (<img src={pic} alt={altDescription} className="profile-image-big"/>)
    }
}
