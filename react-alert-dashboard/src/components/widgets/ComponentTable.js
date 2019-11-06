import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import mapProductHost from './mapProductHost';


let demoComponentList = mapProductHost.VTS.componentList;
const options = {
  expandRowBgColor: 'rgb(242, 255, 163)',
  expandBy: 'column',  // Currently, available value is row and column, default is row
};

class ComponentTable extends React.Component {
  constructor() {
    super();
    this.state = {
      data: { },
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <BootstrapTable ref="table" options={ options } data={demoComponentList} striped hover>
        <TableHeaderColumn dataField="component" dataAlign="left" isKey>component</TableHeaderColumn>
        <TableHeaderColumn width="120" dataField="hostListOCC" dataAlign="left" expandable={ false }>hostListOCC</TableHeaderColumn>
        <TableHeaderColumn width="200" dataField="hostListOCE" dataAlign="left" expandable={ false }>hostListOCE</TableHeaderColumn>
      </BootstrapTable>
      </div>
  );
  }
}

export default ComponentTable;
