import React, { Component } from 'react';

import LoginUser from '../Accounts/LoginUser';
import RegisterUser from '../Accounts/RegisterUser';


class Forms extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
    }
    
    render() {
        let form;
        switch(this.props.displayed_form){
            case 'login' : 
                form = <LoginUser
                        handleLoginChange={this.props.handleLoginChange}
                        handleLogin={this.props.handleLogin}
                        username={this.props.username}/>;
                break;
            case 'signup' : 
                form = <RegisterUser />
                break;
            default:
                form = <h3>Please Login or Sign Up to Continue</h3>;
            }
        return (
            <div className="form-content">
                {form}            
            </div>
        );
    }
}

export default Forms;