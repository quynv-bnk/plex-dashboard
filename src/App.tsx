import React, { Component } from 'react';
import './App.scss';
import { AdminNavbar } from './views/components/admin-navbar';
import { DataTable, IDeviceInfo } from './views/components/data-table/data-table.component';

const deviceList: IDeviceInfo[] = require("./data/Device.json");

export class App extends Component {
  render() {
    return (
      <>
        <AdminNavbar />
        <div className="container mt-5">
          <DataTable
            columns={[
              {name: "Name"}, {name: "Model"}, {name: "IP"},
              {name: "Online"}, {name: "Rx volume", className: "text-right"}, {name: "Tx volume", className: "text-right"},
            ]}
            data={deviceList}
            itemsPerPage={10}
          />
        </div>
      </>
    );
  }
}
