import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';


class Home extends Component{

        constructor(){
            super();
            this.state = {
                profilePic: [{}],
                loggedIn: sessionStorage.getItem("access_token") === "null" ? false : true,
            }
        }

        UNSAFE_componentWillMount() {

            //call to API Endpoint 1 to get profile-picture
            
            let xhrEndPt1 = new XMLHttpRequest();
            let that = this;
            xhrEndPt1.addEventListener("readystatechange", function(){
                if (this.readyState === 4) {
                    console.log(JSON.parse(this.responseText).data.profile_picture);
                    that.setState({profilePic: JSON.parse(this.responseText).data.profile_picture});
                    console.log(that.state.profilePic);
                }
            });
            xhrEndPt1.open("GET", this.props.baseUrl + "?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
            xhrEndPt1.send(null);

            //call to API End point2

            let xhrEndPt2 = new XMLHttpRequest();
            xhrEndPt2.addEventListener("readystatechange", function(){
                if (this.readyState === 4) {
                   console.log(JSON.parse(this.responseText));

                }
            });
            xhrEndPt2.open("GET", this.props.baseUrl + "media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
            xhrEndPt2.send(null);

            

        }
         
     render() {
               return(
            <div>
                <Header 
                baseUrl={this.props.baseUrl}
                showSearchBox="true" 
                profilePic={this.state.profilePic} 
                loggedIn={this.state.loggedIn}/> 
            </div>
               )}
}

export default Home;