import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CreateTicketRequest, GetTicketsResponse, GetUsersResponse, LoginRequest, LoginResponse, SaveAssigneeRequest, SaveCommentRequest, SaveStatusRequest, signupRequest, Ticket } from '../entities/app.entities';

const baseUrl = "http://localhost:3010/api/";
// const baseUrl = "https://ticket-management-app-server.onrender.com/api/";
const endpoints = {
  login: "users/login",
  signup: "users/signup",
  getUsers: "users",
  getTickets: "tickets",
  createTicket: "tickets",
  saveComment: "comments",
  saveAssignee: "tickets/assign",
  saveStatus: "tickets/status"
}

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(
    private http: HttpClient
  ) { }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${baseUrl}${endpoints.login}`, request);
  }

  public createTicket(request: CreateTicketRequest): Observable<Ticket> {
    return this.http.post<Ticket>(`${baseUrl}${endpoints.createTicket}`, request);
  }

  public signup(request: signupRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${baseUrl}${endpoints.signup}`, request);
  }

  public getTickets(): Observable<GetTicketsResponse> {
    return this.http.get<GetTicketsResponse>(`${baseUrl}${endpoints.getTickets}`);
  }

  public getUsers(): Observable<GetUsersResponse> {
    return this.http.get<GetUsersResponse>(`${baseUrl}${endpoints.getUsers}`);
  }

  public saveComment(request: SaveCommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${baseUrl}${endpoints.saveComment}`, request);
  }

  public saveAssignee(request: SaveAssigneeRequest): Observable<null> {
    return this.http.put<null>(`${baseUrl}${endpoints.saveAssignee}`, request);
  }

  public saveStatus(request: SaveStatusRequest): Observable<null> {
    return this.http.put<null>(`${baseUrl}${endpoints.saveStatus}`, request);
  }
}
