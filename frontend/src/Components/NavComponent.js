import React, { Component } from 'react'
import LoginUser from './Accounts/LoginUser';
import RegisterUser from './Accounts/RegisterUser';

class NavComponent extends Component {
    render(){
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
                form = null;
            }
        const log_in_nav = (
            <nav className="navbar col-6 float-right align-self-center">
                <a className="mr-1 pointer" onClick = {() => this.props.display_form('login')}>Login</a>
                <a className="mr-1 pointer" onClick = {() => this.props.display_form('signup')}>Signup</a>
            </nav>
        );
        const log_out_nav = (
            <nav className="navbar col-6 float-right">
                <a className="mx-1 pointer" onClick={this.props.handleLogout}>Logout</a>
            </nav>
        );
        return (
            <div>
                {this.props.logged_in? log_out_nav : log_in_nav}
                {form}            
            </div>
        );
    }
}
export default NavComponent
