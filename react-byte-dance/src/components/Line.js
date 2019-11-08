import React, {
  Component
} from 'react';
import * as d3 from "d3";

class Line extends Component {

  getDefaultProps() {
    return {
      path: '',
      stroke: 'blue',
      fill: 'none',
      strokeWidth: 3
    };
  }

  render() {
    let {
      path,
      stroke,
      fill,
      strokeWidth
    } = this.props;
   
    return ( 
        <path d={path} fill={fill} stroke = {stroke} strokeWidth={strokeWidth}/>
    );
  }
}

export default Line;