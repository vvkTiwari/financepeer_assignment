import React, { Component } from 'react';

import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import MainScreen from './Components/MainScreen/MainScreen';
import UserContext from './UserContext';

const base_url = window.SERVER_ADDRESS
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			logged_in : localStorage.getItem('token') ? true : false,
			username : '',
			displayed_form : ''
		}
	}
	
	componentDidMount(){
		if(this.state.logged_in){
			fetch(base_url + 'user-data/current_user/', {
				method : 'GET',
				headers : {
					Authorization : `JWT ${localStorage.getItem('token')}`
				}
			})
			.then(res => res.json())
			.then(resp => {
				this.setState({ username : resp.username })
			})
			.catch(err => console.log(err));
		}
	}
	
	display_form = (formName) => {
        this.setState({
            displayed_form : formName
        });
	}

	handleLoginChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
	}

	handleLogin = (e, data) => {
		e.preventDefault();
		console.log(data)
		fetch(base_url + 'token-auth/', {
			crossDomain : true,
			withCredentials : true,
			async : true,
			method : 'POST',
			headers : {
				'Content-Type' : 'application/json',
			},
			body : JSON.stringify(data)
		})
		.then(response => response.json())
		.then(json => {
			localStorage.setItem('token', json.token);
			this.setState({
				logged_in : true,
				username : json.user.username
			})
		})
		.catch(error => {
			console.log(error)
		})
		this.setState({
			displayed_form : ''
		})
    }

	handleLogout = () => {
		localStorage.removeItem('token');
		this.setState({logged_in : false, username : ''})
	}

	render() {
		const { logged_in, username, displayed_form } = this.state;
		const value = {
			logged_in: this.state.logged_in,
			handleLogout: this.handleLogout,
		}
		return (
			<UserContext.Provider value={value}>
				<div className="container-fluid fp-main-container">
					<Header display_form={this.display_form} />
					<MainScreen handleLogin={this.handleLogin} displayed_form={displayed_form}
						handleLoginChange={this.handleLoginChange} username={username} logged_in={logged_in} />
					<Footer />
				</div>
			</UserContext.Provider>

		)
	}
}

export default App;