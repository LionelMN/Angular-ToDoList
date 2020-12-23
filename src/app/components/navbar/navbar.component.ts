import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private auth:AuthService,
    private router : Router
    ) { }


  logout(){
    this.auth.logout()
    this.router.navigateByUrl('/login')
  }

  ngOnInit(): void {
  }

}
