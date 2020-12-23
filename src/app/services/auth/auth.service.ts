import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponse, Users } from '../../models/models';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject = new BehaviorSubject(false)
  private token : string;
  constructor(
    private http : HttpClient
  ) { }

  register(user : Users) : Observable<any>{
    return this.http.post(`${environment.backUrl}/register`, user)
      .pipe(tap(
        (res) => {
          if (res){
          }
        }
      ))
  }

  login(user : Users) : Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${environment.backUrl}/login`, user)
      .pipe(tap(
        (res : JwtResponse) => {
          if (res){
            this.saveToken(res.token);
            this.saveUserLogged(res.user.username)
          }
        }
      ))
  }

  public saveToken(token: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    this.token = token;
  }

  public saveUserLogged(username: string) : void{
    localStorage.setItem(
      "user",
      JSON.stringify(username)
      )
  }

  logout() :void {
    this.token = "";
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("EXPIRE_IN")
    localStorage.removeItem("user")
  }

}
