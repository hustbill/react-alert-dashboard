import React from 'react';

import * as d3 from "d3";

import logo from './logo.svg';
import './App.css';

import BytesDance from './components/BytesDance';
import Line from './components/Line';
import Chart from './components/Chart';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      domain: {
        x: [0, 30],
        y: [0, 100]
      },
      color: "cornflowerblue",
      width: 960,
      height: 500,
      id: 'root',
      alphabet: "abcdefghijklmnopqrstuvwxyz"
    }
  }
  
  render() {
     return (
      <div className="App"> 
       
        {/* <header className="App-header"> 
          <p>
            bytes dance 
          </p>        
        </header> */}
         {/* <div id="drawArea" style={{ "width": this.state.width, "height": this.state.height, "border": "1px solid grey" }}> hello world!</div> */}
        
          {/* <Line path={path(this.state.series1)} color={this.state.color} />         */}

         <BytesDance 
         width = {
           this.state.width
         }
         height = {
           this.state.height
         }
         data = {
           this.state.alphabet
         }
         />
          {/* <Chart
          data = {
            this.state.data
          }
          domain = {
            this.state.domain
          }
          /> */}
         {/* <Ball 
         width = {
           this.state.width
         }
         height = {
           this.state.height
         }
         data = {
           this.state.alphabet
         }
         /> */}
      </div>
    );
  }
}
export default App; 

//   return (
//     <Router history={hashHistory}>
//       <Route path="/" component={Game.Game} /> 
//     < /Router>
//   );
// }


