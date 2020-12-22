import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponse, Users } from '../../models/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  register(user : Users) : Observable<JwtResponse>{
    return this.http.post<JwtResponse>(`${environment.backUrl}/register`, user)
      .pipe(tap(
        (res) => {
          if (res){
            console.log(res);
          }
        }
      ))
  }

  login(user : Users) : Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${environment.backUrl}/login`, user)
      .pipe(tap(
        (res) => {
          if (res){
            console.log(res);
          }
        }
      ))
  }

}
