import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  username = ''
  password = ''
  
  showErrorMessage = false;
  isLoggedin = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {}


  ngOnInit() {

		this.isLoggedin = this.authService.isUserLoggedin();

		if(this.isLoggedin) {
			this.router.navigateByUrl('user');
		}
	}

  navigateByRole(){

  }

  doLogin() {
    (this.authService.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate(['/main'])
      },
      error => {
        this.showErrorMessage=true;

      }));

  }


}
