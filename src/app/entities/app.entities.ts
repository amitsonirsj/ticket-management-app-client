export interface IRequest {
    ticketId: number
}

export interface IUser {
    name: string
    email: string
}

export interface IResponse<T> {
    count: number
    rows: T
}

export interface LoginResponse extends IUser {
    id: string
    role: string
    token: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface CreateTicketRequest {
    title: string
    description: string
    productType: string
}

export interface signupRequest extends IUser {
    password: string
}

export interface User extends IUser {
    id: number
    role: string
}

export interface GetTicketsResponse extends IResponse<Ticket[]> { }

export interface GetUsersResponse extends IResponse<User[]> { }

export interface Ticket {
    assignedTo: number
    assignedToDetail: AssignedToDetail
    createdBy: number
    createdByDetail: CreatedByDetail
    createdAt: Date
    description: string
    id: number
    productType: string
    status: string
    title: string
    comments: Comment[]
}

export interface AssignedToDetail extends IUser {}

export interface CreatedByDetail extends IUser {}

export interface Comment {
    id: number
    content: string
    createdBy: number
    ticketId: number
    createdAt: Date
    createdByDetail: CreatedByDetail
}

export interface SaveCommentRequest extends IRequest {
    content: string
}

export interface SaveAssigneeRequest extends IRequest {
    assignedTo: number
}

export interface SaveStatusRequest extends IRequest {
    status: string
}