import React, { Component } from 'react';
import Header from "../../common/header/Header";
import './Profile.css'
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';



const customStyles = {
  content: {
      top: '60%',
      left: '32%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
  }
};

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 50,
    height: 50,
    marginLeft: 200,
  },
  fab: {
    margin: theme.spacing(1),
  },
  gridListMain: {
    transform: 'translateZ(0)',
    cursor: 'pointer'
},
})

const TabContainer = function (props) {
  return (
      <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
          {props.children}
      </Typography>
  )
}

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      dataAPIEndPt1: [],
      profilePic: [],
      loggedIn: sessionStorage.getItem("access_token") == null ? false : true,
      username: "",
      followedBy: 0,
      follows: 0,
      posts: 0,
      fullName: "",
      userImages: [],
      modalIsOpen: false,
      reqFullName:"dispNone",
      changedFullName: "",

    }
  }

    
  UNSAFE_componentWillMount() {

    //call to API Endpoint 1 to get profile-picture

    let xhrEndPt1 = new XMLHttpRequest();
    let that = this;
    xhrEndPt1.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText));
        that.setState({ dataAPIEndPt1: JSON.parse(this.responseText).data });
        that.setState({ profilePic: JSON.parse(this.responseText).data.profile_picture });
        that.setState({ username: JSON.parse(this.responseText).data.username });
        that.setState({ followedBy: JSON.parse(this.responseText).data.counts.followed_by });
        that.setState({ follows: JSON.parse(this.responseText).data.counts.follows });
        that.setState({ posts: JSON.parse(this.responseText).data.counts.media });
        that.setState({ fullName: JSON.parse(this.responseText).data.full_name });
      }
    });
    xhrEndPt1.open("GET", this.props.baseUrl + "?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
    xhrEndPt1.send(null);

    //call to API End point2

    let xhrEndPt2 = new XMLHttpRequest();
    let that1 = this;
    xhrEndPt2.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(JSON.parse(this.responseText).data);
        that1.setState({ userImages: JSON.parse(this.responseText).data });
        console.log(JSON.parse(this.responseText));
      }
    });
    xhrEndPt2.open("GET", this.props.baseUrl + "media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
    xhrEndPt2.send(null);

  }

  openModalHandler = () => {
    this.setState({modalIsOpen: true});
  }

  closeModalHandler = () => {
    this.setState({modalIsOpen: false});
  }

  onfullNameChangeHandler = (event) => {
    this.setState({changedFullName: event.target.value});
  }

  updateFullNameHandler = () => {
    this.state.changedFullName === "" ? this.setState({reqFullName:"dispBlock"}): this.setState({reqFullName:"dispNone"});
    this.setState({fullName: this.state.changedFullName});
    this.closeModalHandler();
  }


  render() {
    const { classes } = this.props;
    
    return (
      <div>
        <Header
          baseUrl={this.props.baseUrl}
          showSearchBox="false"
          showAccount="false"
          profilePic={this.state.profilePic}
          loggedIn={this.state.loggedIn} />

        <div className="profilePage">
          <div className="profileInfoSection">
            <Avatar alt="Profile_pic" src={this.state.profilePic} className={classes.avatar} />
            <div className="right">
              <span className="username">{this.state.username}</span>
              <span className="userInfo"><span className="infoTabs">Posts: {this.state.posts}</span>
                <span className="infoTabs">Follows: {this.state.follows}</span>
                <span className="infoTabs">Followed By: {this.state.followedBy}</span></span>
              <p className="userFullName">{this.state.fullName}
                <span className="editIcon">
                  <Fab color="secondary" aria-label="edit" className={classes.fab}>
                    <EditIcon onClick={this.openModalHandler} />
                  </Fab>
                </span>
              </p>
              <Modal ariaHideApp={false} isOpen={this.state.modalIsOpen} contentLabel="EditIcon"
              onRequestClose={this.closeModalHandler} style={customStyles}>
                <h2>Edit</h2><br/>
                <TabContainer>
                  <FormControl required>
                    <InputLabel htmlFor="fullName">Full Name</InputLabel>
                    <Input id="fullName" type="text" fullName={this.state.fullName} onChange={this.onfullNameChangeHandler}/>
                    <FormHelperText className={this.state.reqFullName}><span className="red">required</span></FormHelperText>
                  </FormControl><br/><br/>
                </TabContainer><br/>
                <Button variant="contained" onClick={this.updateFullNameHandler} color="primary">UPDATE</Button>
              </Modal>
            </div>
            </div>
            <div  className="flex-container">
              <div className="imagePosts">
                <br/><br/>
              <GridList cellHeight={350} cols={3} className={classes.gridListMain}>
                {this.state.userImages.map(images=>(
                  <GridListTile onClick={()=>this.imageClickHandler(images.id)} className="postedImages-grid-item" key={images.id}>
                      <img src={images.images.standard_resolution.url} className="image-posts" alt={images.caption.text}/>
                  </GridListTile>
                ))}
                </GridList>
              </div>
            </div>
         </div>
        </div>
      )
  }
}

export default withStyles(styles)(Profile);