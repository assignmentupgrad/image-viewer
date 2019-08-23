import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';


class Login extends Component {

    constructor(){
        super();
        this.state = {
            username:"",
            password:"",
            reqUsername: "dispNone",
            reqPassword: "dispNone",
            error: "dispNone",
        }
    }

    inputUsernameChangeHandler =(e) => {
        this.setState({username: e.target.value});
    }

    inputPasswordChangeHandler = (e) => {
        this.setState({ password: e.target.value});
    }

    loginButtonHandler = () => {
        this.state.username === "" ? this.setState({reqUsername: "dispBlock"}): this.setState({reqUsername:"dispNone"});
        this.state.password === "" ? this.setState({reqPassword: "dispBlock"}):this.setState({reqPassword:"dispNone"});
        let usernameCorrect = "IVUser";
        let passwordCorrect ="IVPassword";
        if(this.state.username === usernameCorrect && this.state.password === passwordCorrect){
            ReactDOM.render(<div>Home Page</div>, document.getElementById('root'));
        }
        else{
            if(this.state.username !== "" && this.state.password !== "")
            this.setState({error: "dispBlock"});
        }
             
    }

    render(){
        return(
            <div>
                <Header/> 
            
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="headline" component="h2">
                               LOGIN
                        </Typography> <br/>
                        <FormControl required className="formControl"> 
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler}/>
                        <FormHelperText className={this.state.reqUsername}><span className="red">required</span></FormHelperText>
                         </FormControl><br/><br/>
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="password">Password</InputLabel>
                             <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordChangeHandler}/>
                        <FormHelperText className={this.state.reqPassword}><span className="red">required</span></FormHelperText>
                         </FormControl> <br/><br/>
                         <FormControl required className="formControl">
                         <FormHelperText className={this.state.error}><span className="red">Incorrect username and/or password</span></FormHelperText>
                         </FormControl><br/><br/>
                            <Button variant="contained" onClick={this.loginButtonHandler} color="primary">
                                Login
                            </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Login;