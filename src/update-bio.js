import React from 'react';
import axios from './axios';

export default class UpdateBio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: this.props.bio,
            visibleBioEdit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitChange = this.submitChange.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
        // console.log('this is the state of updatebio handle change: ', this.state)
    }
    submitChange(e) {
        e.preventDefault();
        var bio = this.state.bio
        axios.post('/api/update-bio', this.state )
            .then(resp => {
            if (resp.data.success) {
                // this.props.setBio(resp.data.bio)
            }
            else {
                console.log('ERR UPDATE BIO || UPDATE-BIO.JS');
                this.setState({ error: true })
            }
        }).then(() => {
            this.setState({
                visibleBioEdit: false
            })
        }).catch(err => { console.log('ERR WITH AXIOSPOST || UPDATE BIO || ', err) })

    }

    toggleBio() {
        this.setState({
            visibleBioEdit: true
        })
    }


    render() {
        console.log('these are the props in update bio props', this.props);
        return (

            <div className="bio-container">

            {!this.state.visibleBioEdit &&
                <div className="bio-text">
                    <div>
                        {this.state.bio}
                    </div>
                    <button onClick={this.toggleBio}>Edit Bio</button>
                </div>
            }

                {this.state.visibleBioEdit &&
                    <form>
                        <textarea
                            type="bio"
                            name="bio"
                            onChange={this.handleChange}
                            className="bioTextarea"/>
                        <input
                            type="submit"
                            value="Submit"
                            onClick={this.submitChange}
                            className="form"/>
                    </form>
                }

            </div>
        )
    }
}
