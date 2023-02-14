import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse, Ticket } from 'src/app/entities/app.entities';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent {
  ticketForm: FormGroup | any;
  productTypeOptions = ['Mobile', 'Website', 'General', 'Other'];
  @ViewChild('formDirective') private formDirective!: NgForm;

  constructor(
    private router: Router,
    private _apiHttpService: ApiHttpService,
    private _toastrService: ToastrService,
    private _helperService: HelperService
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
    this._apiHttpService.createTicket(this.ticketForm.value).subscribe((data: Ticket) => {
      if (data) {  
        this.formDirective.resetForm();
        this.ticketForm.reset();      
        this._toastrService.success('Ticket created sucessfully!');
      }
    })
  }
}
