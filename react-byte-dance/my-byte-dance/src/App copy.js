import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Router,
  Route,
  HashRouter
} from 'react-router-dom';

import {render} from 'react-dom';


var Game = require('./components/game');

var App = render(
  <HashRouter>
      <Route path="/" component={Game.Game} />
    </HashRouter>
, document.getElementById('app')
);

export default App;

// function App() {
//   render(){
//     return (
//     <HashRouter>
//           <div>
//             <Route exact path="/" component={Game.game} />
//           </div>
//       </HashRouter >
//       ), document.getElementById('app')
//     )
//   };
// }

// export default App;


/*
function App() {
  return (
    <div className="App"> 
      <header className="App-header"> 
        <p>
          bytes dance 
        </p>
        <HashRouter>
          <div>
            <Route exact path="/" component={Game.game} />
          </div>
      </HashRouter >
      </header>
    </div>
  );
}
export default App; */

//   return (
//     <Router history={hashHistory}>
//       <Route path="/" component={Game.Game} /> 
//     < /Router>
//   );
// }


