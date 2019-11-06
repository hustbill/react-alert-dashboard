import React from 'react';

import * as d3 from "d3";

import logo from './logo.svg';
import './App.css';

import BarChart from './components/BarChart';
import BytesDance from './components/BytesDance';
import Line from './components/Line';
import Ball from './components/Ball';
import Chart from './components/Chart';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    var sampleData = [{
        id: '5fbmzmtc',
        x: 7,
        y: 41,
        z: 6
      },
      {
        id: 's4f8phwm',
        x: 11,
        y: 45,
        z: 9
      },
      // ...
    ];
    this.state = {
      data: sampleData,
      domain: {
        x: [0, 30],
        y: [0, 100]
      },
      color: "cornflowerblue",
      series1: [{
        x: 0,
        y: 20
      }, {
        x: 1,
        y: 30
      }, {
        x: 2,
        y: 10
      }, {
        x: 3,
        y: 5
      }, {
        x: 4,
        y: 8
      }, {
        x: 5,
        y: 15
      }, {
        x: 6,
        y: 10
      }],
      width: 960,
      height: 500,
      id: 'root',
      alphabet: "abcdefghijklmnopqrstuvwxyz".split("")
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
        {/* < BarChart data = {
          this.state.data
        }
        width = {
          this.state.width
        }
        height = {
          this.state.height
        }
        /> */}
        
          {/* <Line path={path(this.state.series1)} color={this.state.color} />         */}

         {/* <BytesDance 
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
          <Chart
          data = {
            this.state.data
          }
          domain = {
            this.state.domain
          }
          />
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


