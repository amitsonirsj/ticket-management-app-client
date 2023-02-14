import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Ticket, User } from 'src/app/entities/app.entities';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent {
  comment = new FormControl("", [Validators.required]);
  assignee = new FormControl(-1, [Validators.required]);
  status = new FormControl("Open", [Validators.required]);

  updateAssignee: boolean = false;
  updateStatus: boolean = false;
  userRole = localStorage.getItem('role');
  users: User[];
  statusOption = ['Open', 'Assigned', 'In Progress', 'Closed'];

  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket,
    private _apiHttpService: ApiHttpService,
    private _toastrService: ToastrService,
    private _helperService: HelperService
  ) {
    this.users = this._helperService.users;
  }

  saveComment() {
    if (this.comment.value)
      this._apiHttpService.saveComment({ content: this.comment.value, ticketId: this.data.id }).subscribe(data => {
        if (data) {
          this.comment.reset();
          if (!this.data.comments || !this.data.comments.length) {
            this.data.comments = [data];
          } else {
            this.data.comments.push(data);
          }
          this._toastrService.success("Comment saved successfully!")
        }
      })
  }

  showAssignedUser() {
    if (this.data.assignedTo) {
      this.assignee = new FormControl(this.data.assignedTo, [Validators.required]);
    }
    this.updateAssignee = true;
  }

  showStatus() {
    if (this.data.status) {
      this.status = new FormControl(this.data.status, [Validators.required]);
    }
    this.updateStatus = true;
  }

  saveAssignee() {
    if (this.assignee.value)
      this._apiHttpService.saveAssignee({ assignedTo: Number(this.assignee.value), ticketId: this.data.id }).subscribe(data => {
        if (data) {
          this.updateAssignee = false;
          const assignedUser = this.users.find(user => user.id == Number(this.assignee.value));
          if (assignedUser) {
            this.data.status = "Assigned";
            this.data.assignedTo = assignedUser.id;
            this.data.assignedToDetail = {
              name: assignedUser.name,
              email: assignedUser.email
            }
          }
          this._toastrService.success("Ticket assigned successfully!")
        }
      })
  }

  saveStatus() {
    if (this.status.value)
      this._apiHttpService.saveStatus({ status: this.status.value, ticketId: this.data.id }).subscribe(data => {
        if (data) {
          this.updateStatus = false;
          this.data.status = this.status.value || '';
          this._toastrService.success("Ticket status updated successfully!")
        }
      })
  }
}
