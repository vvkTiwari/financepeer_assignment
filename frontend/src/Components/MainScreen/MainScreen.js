import React, { Component } from 'react';

import Form from '../Forms/Forms';
import UserData from '../UserData/UserData';


class MainScreen extends Component {
	constructor(props) {
		super(props)

		this.state = {
		}
	}
  
    render() {
            return (
                <div className="jumbotron main-content">
                    {
                        this.props.logged_in ? <UserData /> : <Form handleLogin={this.props.handleLogin} 
                            handleLoginChange={this.props.handleLoginChange}
                            username={this.props.username} displayed_form={this.props.displayed_form} /> 
                    }
                </div>
            );
    }
}

export default MainScreen;