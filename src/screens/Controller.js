import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../screens/login/Login';



class Controller extends Component {

  constructor() {
    super();
    this.baseUrl = "https://api.instagram.com/v1/users/self/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
           <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl}/>} />
           <Route path='/?access_token=ACCESS-TOKEN' render={(props) => <Home {...props} baseUrl={this.baseUrl} />}/>

          {/*  />
          <Route path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl={this.baseUrl} />} />
          <Route path='/confirm/:id' render={(props) => <Confirmation {...props} baseUrl={this.baseUrl} />} /> */}
        </div>
      </Router>
    )
  }
}

export default Controller;