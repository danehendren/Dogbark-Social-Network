import React from 'react';
import { Link } from 'react-router'


export default class Welcome extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome to Dogbook  ∪･ω･∪ </h1>
                <Link to="/">Register</Link> <br/>
                <Link to="/login">Login</Link>
                {this.props.children}
            </div>

        )
    }
}
