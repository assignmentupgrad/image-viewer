import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';

class Home extends Component{

        componentDidMount() {

            //call to API Endpoint 1
            
            let xhrEndPt1 = new XMLHttpRequest();
            xhrEndPt1.addEventListener("readystatechange", function(){
                if (this.readyState === 4) {
                   console.log(JSON.parse(this.responseText));
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
                <Header baseUrl={this.props.baseUrl}/>, 
            </div>
               )
    }
}

export default Home;