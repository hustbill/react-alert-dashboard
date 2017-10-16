import React from 'react';
import Graph from 'react-graph-vis';
import fetch from 'isomorphic-fetch';

import rectangle from '../../assets/rectangle.png';
import webservice from '../../assets/web-services.png';


const graph = {
  nodes: [
    { id: 11, label: 'WebServer', color: '#e04141' },
    { id: 1, label: 'ARM', color: '#e04141' },
    { id: 2, label: 'Credential Management', color: '#e09c41' },
    { id: 21, label: 'checkout-widget', color: '#e09c41' },
    { id: 3, label: 'CBP', color: '#e0df41' },
    { id: 4, label: 'DCS', color: '#7be041' },
    { id: 5, label: 'DDT Services', color: '#41e0c9' },
  ],
  edges: [
    {from: 11, to: 1},
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 21},
    {from: 3, to: 4},
    {from: 3, to: 5},
    {from: 3, to: 2},
  ],
};

const options = {
  // autoResize: true,
  height: '640px',
  width: '800px',
  clickToUse: true,
  interaction: {hover: true},
  physics: {
    stabilization: true,
  },

  layout: {
    randomSeed: 0,
  },
  nodes: {
    borderWidth: 4,
    size: 40,
    fixed: true,
    // physics: false,
    shape: 'image',
    scaling: {
      min: 20,
      max: 60,
    },
    color: {
      border: '#222222',
      background: '#666666',
    },
    font: {
      color: '#000000',
      size: 14,
      face: 'Tahoma',
      align: 'center',
    },
  },
  edges: {
    color: 'green',
    size: 6,
    // arrows: {to: {enabled: false, scaleFactor: 0.5}}, // remove arrows
  },
};

let events = {
  select: function(event) {
    const {nodes, edges} = event;
    if (nodes !== null) {
      console.log('Selected nodes:');
      console.log(nodes);
    }
    if (nodes.length === 0 && edges.length === 1) {
      console.log('Selected edges:');
      console.log(edges);
    }
  },
};

function draw(data) {
  let newGraph = {};
  if (data === null)  {
    return graph;
  }
  const nodes = createNodes(data.nodes);
  const edges = createEdges(data.edges);
  newGraph = {nodes, edges};
  return newGraph;
}

function createNodes(devices) {
  const nodes = [];
  if (devices === null || devices.length === 0) {
    return nodes;
  }

  const len = devices.length;
  for (let i = 0; i < len; i++) {
    switch (devices[i].label) {
    case 'WebServer':
      devices[i].image = webservice;
      devices[i].x = -300;
      devices[i].y = -80;
      break;
    case 'ARM':
      devices[i].image = rectangle;
      devices[i].x = -40;
      devices[i].y = -80;
      break;
    case 'CBP':
      devices[i].image = rectangle;
      devices[i].x = 220;
      devices[i].y = -80;
      break;
    case 'DCS':
      devices[i].image = rectangle;
      devices[i].x = 120;
      devices[i].y = -240;
      break;
    case 'DDT Services':
      devices[i].image = rectangle;
      devices[i].x = 320;
      devices[i].y = -240;
      break;
    case 'Credential Management':
      devices[i].image = rectangle;
      devices[i].x = -40;
      devices[i].y = 40;
      break;
    case 'checkout-widget':
      devices[i].image = rectangle;
      devices[i].x = -40;
      devices[i].y = 180;
      break;
    default:
      devices[i].image = rectangle;
      // devices[i].x = -100 + 240 * i;
      // devices[i].y = 120 * i;
      break;

    }
    nodes.push(devices[i]);
  }
  return nodes;
}

function createEdges(edges) {
  return edges; // to be modified
}

class ComponentGraph extends React.Component {
  // class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countryNames: [],
      loading: false,
    };
  }

  componentDidMount() {
    // this.setState({loading: true})
    fetch('https://restcountries.eu/rest/v1/all')
      .then(response => response.json())
      .then(json => json.map(country => country.name))
      .then(countryNames => this.setState({countryNames, loading: false})
    );
  }

  render() {
    const {countryNames, loading} = this.state;
    if (loading) {
      console.log('<div> Loading Country Names </div>', countryNames);
    }

    return (
      <div>
        <Graph graph={draw(graph)} options={options} events={events} />
      </div>


    );
  }
}

// render(
//   <CountryList/>, document.getElementById('react-container')
// )
export default ComponentGraph;
