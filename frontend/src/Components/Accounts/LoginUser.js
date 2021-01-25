import React, { Component } from 'react'

class LoginUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password : ''
        }
    }
    handlePasswordChange = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    render() {
        return (
            <div>
                <form className="form mauto" onSubmit={e => this.props.handleLogin(e, {
                    username : this.props.username, 
                    password : this.state.password
                })} >
                    <div className="form-group">
                        <label htmlFor="username" >Username</label>
                        <input type="text" className="form-control form-control-sm"
                        onChange={this.props.handleLoginChange} 
                        value={this.props.username} 
                        name="username"
                        id="username"
                        placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input type="password"  className="form-control form-control-sm"
                        onChange={this.handlePasswordChange} 
                        value={this.state.password} 
                        name="password"
                        id="password"
                        placeholder="Password" />
                    </div>
                    <button className="btn btn-primary" type='submit'>Login</button>
                </form>
            </div>
        )
    }
}

export default LoginUser