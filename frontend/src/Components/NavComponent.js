import React, { Component } from 'react'


class NavComponent extends Component {
    constructor(props) {
		super(props)
		this.state = {
		}
    }

    render(){
        console.log(this.props);
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
            </div>
        );
    }
}

export default NavComponent
