import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  token = localStorage.getItem('token');

  constructor(
    private router: Router,
    private _toastrService: ToastrService,
    private _helperService:HelperService
  ) {
    this._helperService.updateHeader.subscribe(() => {
      this.token = localStorage.getItem('token');
    })
  }
  logout() {
    this._toastrService.success("Logged out successfully!");
    localStorage.clear();
    this.token = null;
    this.router.navigate(['/', 'login']);
  }
}
