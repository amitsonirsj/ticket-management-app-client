import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/entities/app.entities';
import { ApiHttpService } from 'src/app/services/api-http.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent {
  ticketForm: FormGroup | any;
  isLoading = false;
  productTypeOptions = ['Mobile', 'Website', 'General', 'Other'];
  @ViewChild('formDirective') private formDirective!: NgForm;

  constructor(
    private _apiHttpService: ApiHttpService,
    private _toastrService: ToastrService
  ) {
    this.ticketForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      productType: new FormControl('General', [Validators.required])
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.ticketForm.valid) {
      return;
    }
    this.isLoading = true;
    this._apiHttpService.createTicket(this.ticketForm.value).subscribe((data: Ticket) => {
      this.isLoading = false;
      if (data) {
        this.formDirective.resetForm();
        this.ticketForm.reset();
        this._toastrService.success('Ticket created sucessfully!');
      }
    }, error => {
      this.isLoading = false;
    })
  }
}
