import { Component, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/entities/app.entities';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  displayedColumns = ['id', 'title', 'status', 'productType', 'createdBy', 'assignedTo'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource!: MatTableDataSource<Ticket>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _apiHttpService: ApiHttpService,
    public _dialog: MatDialog,
    private _helperService: HelperService,

  ) {
    if (!this._helperService.users || !this._helperService.users.length)
      this._helperService.getUsers();
    this._apiHttpService.getTickets().subscribe(data => {
      if (data && data.rows) {
        this.dataSource = new MatTableDataSource(data.rows);
        setTimeout(() => {
          this.dataSource.sort = this.sort;
        }, 100);
      }

    })
  }

  headerText(header: string): string {
    switch (header) {
      case 'id':
        return 'ID'
      case 'title':
        return 'TITLE'
      case 'status':
        return 'STATUS'
      case 'productType':
        return 'PRODUCT TYPE'
      case 'createdBy':
        return 'CREATED BY'
      case 'assignedTo':
        return 'ASSIGNED TO'

      default:
        return header;
    }
  }

  cellValue(data: any, header: string) {
    switch (header) {
      case 'createdBy':
        return data.createdByDetail.email
      case 'assignedTo':
        return data.assignedToDetail?.email
      default:
        return data[header];
    }
  }

  showDetail(data: Ticket) {
    this._dialog.open(TicketDetailComponent, {
      width: '100%',
      height: '100%',
      data
    })
  }
}