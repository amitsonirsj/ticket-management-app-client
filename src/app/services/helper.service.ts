import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../entities/app.entities';
import { ApiHttpService } from './api-http.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public updateHeader: EventEmitter<boolean> = new EventEmitter<boolean>();
  public users: User[] = [];

  constructor(
    private _apiHttpService: ApiHttpService
  ) { }

  getUsers() {
    this._apiHttpService.getUsers().subscribe(data => {
      if (data.rows) {
        this.users = data.rows;
      }
    })
  }

  public changeHeader(loggedIn: boolean) {
    this.updateHeader.emit(loggedIn);
  }
}
