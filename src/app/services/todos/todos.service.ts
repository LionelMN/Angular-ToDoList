import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todos } from '../../models/models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  msg : string
  constructor(private http: HttpClient) { }

    public getAllTodosOfUser(user) : Observable<any>{
      return this.http.get(`${environment.backUrl}/todos/user/${user}`) as Observable<Todos[]>
    }

    public editTodo(todo : Todos) : Observable<any>{
      return this.http.put(`${environment.backUrl}/todos/${todo._id}`, todo).pipe(tap(
        res => {
          if (res){
            this.msg = res;
          }
        }
      ))
    }

}
