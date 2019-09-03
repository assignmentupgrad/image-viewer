import React, { Component } from 'react';
//import moment from 'react-moment'
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
      card: {
        maxWidth: 550,
        margin: 20,
        height: 'auto',
        marginLeft: '4%',
      },
     avatar: {
        margin: 15,
        width: 60,
        height: 60,
     },
     hr: {
        width: 460,
     },
     icon: {
        margin: theme.spacing(1),
        fontSize: 32,
     }
});

function FavoriteBorderIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 
        2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 
        5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 
        5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
      </SvgIcon>
    );
  }

  function FavoriteIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
         3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </SvgIcon>
    );
  }
  

class Home extends Component{

    constructor(){
        super();
        this.state = {
            profilePic: [],
            access_token: sessionStorage.getItem("access_token"),
            loggedIn: sessionStorage.getItem("access_token") === "null" ? false : true,
            userImages: [],
            createdTime: [],
            username: [],
            captionText:[],
            captionTag:[],
            favClick: false,
            addComment: [],
            searchField: "",
            filteredRes:[],
            
            }
    }
        
        UNSAFE_componentWillMount() {

            //call to API Endpoint 1 to get profile-picture
            
            let xhrEndPt1 = new XMLHttpRequest();
            let that = this;
            xhrEndPt1.addEventListener("readystatechange", function(){
                if (this.readyState === 4){
                    console.log(JSON.parse(this.responseText));
                    that.setState({profilePic: JSON.parse(this.responseText).data.profile_picture});
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

          onSearchFilterHandler = e => {
          //     const searchText = event.target.value.toLowerCase();
          //     let userDetails = JSON.parse(JSON.stringify(this.state.userImages));
          //  let filterRes = [];
          //  if(userDetails !== null && userDetails.length > 0){
          //    filterRes = userDetails.filter( 
          //      post => (
          //      post.caption.text.split("\n")[0].toLowerCase.indexOf(searchText) > -1
          //      ));
          //      this.setState({filteredRes:filterRes});
          //   }
        }

         addBtnCommentHandler = (event, id) => {
            let user_Images = JSON.parse(JSON.stringify(this.state.userImages));

         }
                
        myDateFun = (imgdate) => {
          return moment(new Date(parseInt(imgdate))).format("DD/MM/YYYY HH:mm:ss");
        }
         
        addCommentChangeHandler = (event) => {
          this.setState({addComment:event.target.value});
        }
                
        render() {
            const { classes } = this.props;

             return(
            <div>
                <Header 
                baseUrl={this.props.baseUrl}
                showSearchBox="true" 
                profilePic={this.state.profilePic} 
                loggedIn={this.state.loggedIn}
                showAccount="true"
                onSearchInputChangeHandler={this.onSearchFilterHandler()}/> 
                <div>             
                    <GridList cols={2} cellHeight='auto'>
                    {this.state.userImages.map(img =>(
                        <Card className={classes.card} key={img.cols}>
                            <CardHeader avatar={
                             <Avatar alt="profile-Pic" src={(this.state.profilePic).toString()} className={classes.avatar}/>
                            }    
                             title={img.user.username}     
                            // subheader={moment(img.caption.created_time).format("DD-MM-YYYY hh:mm:ss")}>
                            subheader = {this.myDateFun(img.caption.created_time)}>
                            </CardHeader>
                            <CardContent>
                            <GridListTile key={"userImg"+ img.id} className="user-image-grid-item">
                                <img src={img.images.standard_resolution.url} className="userImage" alt={img.caption.text}/>
                            </GridListTile>
                            <hr className={classes.hr}/>
                            { this.state.comment !=="" ?
                            <p>{img.user.username}:{this.state.comment} </p> : ""}
                             <h4 className="captionText">{(img.caption.text).split("#")[0]}</h4>
                            {img.tags.map(tags=>(
                               <span className="captionTag">{"#"+tags+""}</span>
                            ))} <br/>
                             <span onClick={()=>this.setState({favClick: !this.state.favClick})}>
                             {this.state.favClick === true? <div>
                             <span className="favIcon"><FavoriteIcon className={classes.icon}/></span>
                              <span className="like">{" "+ (img.likes.count)--} likes</span> </div>:
                           <div><span><FavoriteBorderIcon className={classes.icon}/></span>  <span className="like">{" "+ (img.likes.count)++} likes</span></div> } 
                            </span>
                             <br/><br/>
                            <span>
                            <FormControl className="formControl"> 
                                <InputLabel htmlFor="addComment">Add a comment</InputLabel>
                                <Input id="addComment" type="text" comment={this.state.comment} placeholder="Add a comment"
                                onChange={this.addCommentChangeHandler.bind(this)} value={this.state.addComment}/>
                            </FormControl>
                            <Button variant="contained" onClick={this.addBtnCommentHandler.bind(this,img.id)} 
                            color="primary" className="AddBtn">
                                ADD
                            </Button>
                            </span>
                            </CardContent>
                         </Card>
                    ))}
                 </GridList>
                 </div>
                        
            </div>
               )}
}

export default withStyles(styles)(Home);