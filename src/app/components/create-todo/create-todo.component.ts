import { Component, Inject, OnInit } from '@angular/core';
import { TodosService } from '../../services/todos/todos.service';
import { Todos } from '../../models/models';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {

  msgErrors : string
  constructor(
    private todosService: TodosService,
    @Inject(DOCUMENT) private document: Document
  ) { }


  ngOnInit(): void {
  }

  onValidate(form){
    if (!form.value.title){
      this.msgErrors = "Please introduce a title";
    } else {
      form.value.owner = JSON.parse(localStorage.getItem("user"));
      this.onSubmit(form.value);
    }
  }

  onSubmit(form : Todos) {
    this.todosService.createTodo(form).subscribe( (res) => {
      this.document.location.reload()
    })
  }

  reset(){
    this.msgErrors = ""
  }
}
