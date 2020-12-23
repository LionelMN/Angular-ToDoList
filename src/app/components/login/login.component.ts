import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msgErrors : string;
  showPass : boolean = false;
  constructor(
    private auth : AuthService,
    private router : Router
  ) { }

  reset(){
    this.msgErrors = ""
  }

  showPassword(id){
    const x = document.getElementById(id);
    if (x.getAttribute('type') === 'password') {
      x.setAttribute('type', 'text');
    } else {
      x.setAttribute('type', 'password');
    }
    if (id === "password"){
      this.showPass = !this.showPass;
    }
  }

  onLogin(form){
    form.value.username = form.value.username.toLowerCase()
    this.auth.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/home')
    })
    setTimeout( () => {
      this.msgErrors = "User or password are incorrect"
    }, 500)
  }

  ngOnInit(): void {
  }

}
