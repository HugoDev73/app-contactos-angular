import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../models/response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  user: User = {
    userId: 0,
    userFullName: '',
    userName: '',
    userPassword: '',
    userEmail: '',
    userPhoto: ''
  }
  stateForm:boolean = true;
  count!:number;

  private userObservablePrivate: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);
  private statusFormPrivate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.stateForm);

  /**
   * Obtener el usuario
   */
  get userObservable() {
    return this.userObservablePrivate.asObservable();
  }
  set userObservableData(data: User) {
    this.userObservablePrivate.next(data);
  }

  /**
   * Obtener y asignar el estado del formulario
   */
  get statusFormObservable() {
    return this.statusFormPrivate.asObservable();
  }
  set statusFormObservableData(data: boolean) {
    this.statusFormPrivate.next(data);
  }

  getUsers(): Observable<ResponseApi> {
    const body = {
      "offset": 1,
      "limit": 10,
      "searchTerm": "test"
    }
    return this.http.put<ResponseApi>(`${environment.baseUrl}/users`, body);
  }

  getUser(id:number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${environment.baseUrl}/users/profile/${id}`);
  }

  createUser(user:User): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${environment.baseUrl}/users/create`, user);
  }

  updateUser(user:User): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${environment.baseUrl}/users/update/${user.userId}`, user);
  }

  deleteUser(id: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${environment.baseUrl}/users/delete/${id}`);
  }

}
