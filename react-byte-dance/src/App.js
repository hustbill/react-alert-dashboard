import React from 'react';

import * as d3 from "d3";

import logo from './logo.svg';
import './App.css';
import {data0, data1, alphabet} from './Constant';

import BytesDance from './components/BytesDance';
import ScatterPlot from './components/ScatterPlot';
import Alphabet from './components/Alphabet';
import Game from './components/Game';


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
      alphabet
    }
  }

  componentDidMount() {
    // Grab a random sample of letters from the alphabet, in alphabetical order.
    setInterval(
      () => this.randomMagicNumber(),
      1500
    );
  }

  randomMagicNumber = () => {
    this.setState({
      alphabet: d3.shuffle(alphabet).slice(0, Math.floor(Math.random() * 26)).sort()
    });
  }
  
  render() {
    const data = d3.shuffle(this.state.alphabet).slice(0, Math.floor(Math.random() * 26)).sort();

     return (
      <div className="App"> 
       
        {/* <header className="App-header"> 
          <p>
            bytes dance 
          </p>        
        </header> */}
         {/* <div id="drawArea" style={{ "width": this.state.width, "height": this.state.height, "border": "1px solid grey" }}> hello world!</div> */}
        
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
         />
         
            <ScatterPlot data0={data0} data1={data1} width={600} height={480}/>     */}
         <Alphabet data={data} width={600} height={400} x={200} y={600}/>
         
         
          {/* <Game
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


