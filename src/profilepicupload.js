import React, {Component} from 'react';
import axios from './axios';


export class ProfilePicUpload extends Component {
    constructor(props) {
        super(props)

    this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this);
    this.setFile = this.setFile.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.submitChange = this.submitChange.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
}

    setFile(e) {
        this.setState({ file: e.target.files[0] }, () => console.log('this.state inside profile pic upload'))
    }

    uploadProfilePhoto(e) {
        e.preventDefault()
        var file = this.state.file;
        var formData = new FormData()

        formData.append('file', file)
        axios({
            url: '/api/upload-profile-photo',
            method: 'POST',
            data: formData,
        })
            .then(({data}) => {
                // console.log('inside axios post that anne said', data);
                this.props.updateImage(data.newPic)
                this.fileInput.value = null;
            })
            .catch((e) => console.log('we caught the error', e));
    }

    // changeHandler() {
    //     // console.log('changeHandler function is running');
    //     axios.get('/api/update-profile-photo')
    //         .then(({data}) => {
    //             this.setState({
    //                 pic: data.newPic
    //             })
    //         })
    // }

        //
        // handleChange(e) {
        //     e.preventDefault()
        //     this.setState({
        //         bioUpdate: e.target.value
        //     })
        // }

        // submitChange(e) {
        //     e.preventDefault()
        //     console.log('this is bio', this.state.bioUpdate);
        //     console.log('this is my submitchange id', this.state);
        //
        // }




    render() {
        // console.log('profile picture upload props here: ', this.props);
        return (
            <div className="image-form">
                <form>
                    <input onChange={this.setFile} type="file" name="file" ref={ref => this.fileInput = ref} />
                    <button onClick={this.uploadProfilePhoto} name="button">Upload Image</button>
                </form>

            </div>
        )
    }
}

export default ProfilePicUpload
