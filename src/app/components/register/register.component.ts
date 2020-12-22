import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Users } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msgErrors = [];
  showPass : boolean = false;
  showCPass : boolean = false;
  constructor(
    private auth : AuthService,
    private router : Router
    ) { }

  onRegister(user : Users) : void {
    this.auth.register(user).subscribe( () => {
      this.router.navigateByUrl('/login')
    })
  }

  onValidate(form) : void {
    let errors = false;
    if (!form.value.username || form.value.username.length > 10){
      errors = true;
      this.msgErrors[0] = "Your username has to have a max o 10 characters";
    } else {
        this.msgErrors[0] = "";
        form.value.username = form.value.username.toLowerCase()
    }

    if (!form.value.email || !this.emailValid(form.value.email)){
      errors = true;
      this.msgErrors[1] = "Please introduce a valid email";
    } else {
       this.msgErrors[1] = "";
       form.value.email = form.value.email.toLowerCase()
    }

    if (!form.value.password || form.value.password.length < 8){
      errors = true;
      this.msgErrors[2] = "Your password has to have at least 8 characters";
    } else {
      this.msgErrors[2] = "";
      if (form.value.password !== form.value.cPassword){
        errors = true;
        this.msgErrors[3] = "The passwords doesn't match";
      } else this.msgErrors[3] = "";
    }

    if (errors === false){
      this.onRegister(form.value)
    }
  }

  emailValid(email){
    return /^\S+@\S+\.\S+$/.test(email)
  }

  reset(){
    this.msgErrors = []
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
    if (id === "cpassword"){
      this.showCPass = !this.showCPass;
    }
  }

  ngOnInit(): void {
  }

}
