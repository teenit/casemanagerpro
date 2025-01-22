import React, { Component } from 'react';
import FieldsTable from '../tables/FieldsTable';

class FieldsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModal: false
    };
  }


  render() {
   return <div>
        <FieldsTable />
    </div>
  }
}

export default FieldsPage;
