
import React, { Component } from 'react';
import axios from 'axios';

import UserDataDetail from './UserDataDetails';


const base_url = window.SERVER_ADDRESS;

class UserData extends Component {

  state = {
    file: null,
    userData: [],
    showUserdata: false
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  };

  fetchAllUserData = () => {
    let url = base_url + 'user-data/fetch-all/';
    fetch(url)
      .then(res => res.json())
      .then(resp => {
        this.setState({ userData : JSON.parse(resp), showUserdata: true })
      })
      .catch(err => console.log(err));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('file', this.state.file, this.state.file.name);
    let url = base_url + 'user-data/upload/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
        })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="fp-upload-file-form">
        <form className="form-group mauto" onSubmit={this.handleSubmit}>
          <p className="text-center">
            <input type="file" className="form-control"
                   id="file"
                   accept="*.json"  onChange={this.handleFileChange} required/>
          </p>
          <input className="btn btn-primary" type="submit"/>
        </form>
        <button className="btn btn-primary mt-2" onClick={this.fetchAllUserData}>See All Data</button>
        { this.state.showUserdata ? <UserDataDetail userdata={this.state.userData} /> : null }
      </div>
    );
  }
}

export default UserData;