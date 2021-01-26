
import React, { Component } from 'react';
import axios from 'axios';

import UserDataDetail from './UserDataDetails';


const base_url = window.SERVER_ADDRESS;

class UserData extends Component {

  state = {
    file: null,
    userData: [],
    showUserdata: false,
    uploadFormVisible: true
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  };

  fetchAllUserData = () => {
    this.setState({uploadFormVisible: false})
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
          alert('Data Uploaded Successfully')
          console.log(res.data);
        })
      .catch(err => {
        alert("Some error occured while uploading file!")
        console.log(err)
      });
  };

  render() {
    return (
      <div className="userdata">
        { this.state.uploadFormVisible ? 
          <form className="form-group mauto mt-5" onSubmit={this.handleSubmit}>
            <h3>Upload a file to populate DB.</h3>
            <p className="text-center">
              <input type="file" className="form-control"
                    id="file"
                    accept="*.json"  onChange={this.handleFileChange} required/>
            </p>
            <input className="btn btn-primary" type="submit"/>
            <br/><p class="mt-5">OR</p>
          </form>
          : null
        }
          <button className="btn btn-success mt-5" onClick={this.fetchAllUserData}>Fetch All User Data</button>
          { this.state.showUserdata ? <UserDataDetail userdata={this.state.userData} buttonVisible={ !this.state.uploadFormVisible } /> : null }
      </div>
    );
  }
}

export default UserData;