import React from 'react';
import axios from './axios';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: false

        }
        this.handleClick = this.handleClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault()

        const {firstName, lastName, email, password} = this.state;
        const data = { firstName, lastName, email, password }
        if(!firstName || !lastName || !email || !password){
            this.setState({error: true});
        } else {
            axios.post('/api/register', data)
            .then(() => {
                location.replace('/')
            })
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <div>Please fill in the required fields</div>}
                <input className="register-form" name="firstName" onChange={this.handleChange}  placeholder="First Name"></input>
                <input className="register-form" name="lastName" onChange={this.handleChange} placeholder="Last Name"></input>
                <input className="register-form" name="email" onChange={this.handleChange}  placeholder="E-mail"></input>
                <input className="register-form" name="password" onChange={this.handleChange}  placeholder="Password" type="password"></input>
                <button onClick={this.handleClick}>Join the other pups!</button>
            </div>
        )
    }
}
