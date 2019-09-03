import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Profile.css'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    marginLeft: 200,
  },

})

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      dataAPIEndPt1:[],
      profilePic: [],
      loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
      profilePic: [],
      username:"",
      followedBy: 0,
      follows: 0,
      posts: 0,
      fullName: "",
      userImages: [],
    }
  }


  UNSAFE_componentWillMount() {

     //call to API Endpoint 1 to get profile-picture
            
     let xhrEndPt1 = new XMLHttpRequest();
     let that = this;
     xhrEndPt1.addEventListener("readystatechange", function(){
         if (this.readyState === 4){
             console.log(JSON.parse(this.responseText));
             that.setState({dataAPIEndPt1: JSON.parse(this.responseText).data});
             that.setState({profilePic: JSON.parse(this.responseText).data.profile_picture});
             that.setState({username:JSON.parse(this.responseText).data.username});
             that.setState({followedBy: JSON.parse(this.responseText).data.counts.followed_by});
             that.setState({follows:JSON.parse(this.responseText).data.counts.follows});
             that.setState({posts:JSON.parse(this.responseText).data.counts.media});
             that.setState({fullName: JSON.parse(this.responseText).data.full_name});
        }
     });
     xhrEndPt1.open("GET", this.props.baseUrl+"?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
     xhrEndPt1.send(null);

     //call to API End point2

     let xhrEndPt2 = new XMLHttpRequest();
     let that1 = this;
     xhrEndPt2.addEventListener("readystatechange", function(){
         if (this.readyState === 4) {
          console.log(JSON.parse(this.responseText).data);
          that1.setState({userImages: JSON.parse(this.responseText).data});
          console.log(JSON.parse(this.responseText));
          }                
     });
     xhrEndPt2.open("GET",this.props.baseUrl+"media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
     xhrEndPt2.send(null);
 
  }

  
  render() {
    const { classes } = this.props;
    return(
        <div>
         <Header 
         baseUrl={this.props.baseUrl}
         showSearchBox="false" 
         showAccount="false"
         profilePic={this.state.profilePic} 
         loggedIn={this.state.loggedIn} /> 

          <div className="profilePage">
            <div className="profileInfoSection">
                 <Avatar alt="Profile_pic" src={this.state.profilePic} className={classes.avatar}/>
            </div>
          </div>
      </div>
    )
  }}

  export default withStyles(styles) (Profile);