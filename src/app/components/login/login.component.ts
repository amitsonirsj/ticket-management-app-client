import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/entities/app.entities';
import { ApiHttpService } from 'src/app/services/api-http.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;

  constructor(
    private router: Router,
    private _apiHttpService: ApiHttpService,
    private _toastrService: ToastrService,
    private _helperService:HelperService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required, Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
  }
  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this._apiHttpService.login(this.loginForm.value).subscribe((data:LoginResponse) => {
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this._helperService.changeHeader(true);
        this._toastrService.success('Login Success!');
        this.router.navigate(['/', 'dashboard']);
      }
    })
  }
}