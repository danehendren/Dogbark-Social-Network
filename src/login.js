import React from 'react';
import axios from './axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick(e){
        e.preventDefault()

        if(!this.state.email) {
            this.setState({error: true});
        } else {
            axios.post('/api/login', {
                email: this.state.email,
                password: this.state.password
            })
            .then(() => {
                location.replace('/')
            })
        }
    }


    render() {
        return(
            <div>
                <input onChange={this.handleChange} name="email" placeholder="E-mail"/>
                <input onChange={this.handleChange} name="password" placeholder="Password" type="password"/>
                <button onClick={this.handleClick}>Login</button>
            </div>
        )
    }
}
