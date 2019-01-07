import { Component, OnInit } from '@angular/core';

import { PortTableService } from '../../services/port-table.service';

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css']
})
export class PortsComponent implements OnInit {

  portsTable = [];
  dataFetched = false;
  
  constructor(private portTable: PortTableService) { }

  ngOnInit() {
    this.getPortsTable();
  }

  getPortsTable(): void {
    this.portTable.getPortTable().subscribe(portsTable => {
      this.portsTable = portsTable;
      this.dataFetched = true;
    });
  }
}