import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
       render(){
        return(
            <div>
               <header className="app-header">
                    <p className="logo">Image Viewer</p>
                </header><br/><br/>
            </div>
        )
    }
}

export default Header;