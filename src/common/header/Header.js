import React, {Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

class Header extends Component {
       render(){
        return(
            <div>
               <header className="app-header">
                    <p className="logo">Image Viewer</p>
                    {/* Search Box Added */}
                    <div className="searchBox">
                    <img src={logo} className="app-logo" alt="Search Logo"/> 
                    <FormControl className="formControl">
                      <Input className="searchText" type="text" placeholder="Search..." disableUnderline="true"/>
                    </FormControl>
                    </div>
                </header><br/><br/>
            </div>
        )
    }
}

export default Header;