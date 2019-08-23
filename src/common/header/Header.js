import React, {Component} from 'react';
import './Header.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';


class Header extends Component {

    constructor(){
        super();
        this.state = {
            username:"",
            password:""
        }
    }

    inputUsernameChangeHandler =(e) => {
        this.setState({username: e.target.value});
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value});
    }

       render(){
        return(
            <div>
               <header className="app-header">
                    <p className="logo">Image Viewer</p>
                </header><br/><br/>
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="headline" component="h1">
                               LOGIN
                        </Typography> <br/><br/>
                        <FormControl required className="formControl"> 
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username}
                            onChange={this.inputUsernameChangeHandler}/>
                         </FormControl><br/><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">Password</InputLabel>
                             <Input id="password" type="password" password={this.state.password}
                             onChange={this.inputPasswordChangeHandler}/>
                         </FormControl> <br/><br/><br/>
                            <Button variant="contained" color="primary">Login</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Header;