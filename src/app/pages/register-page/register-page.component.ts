import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  constructor(private userService:UserService,private route:ActivatedRoute,private router:Router) { }

  user : User = new User();  
  showErrorMessage = false;

  ngOnInit(): void {
  }

  registerform=new FormGroup({  
    firstName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),  
    lastName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ), 
    password:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
    email:new FormControl('',[Validators.required,Validators.email]),   
  });  
  

  get firstName(){  
    return this.registerform.get('firstName');  
  }  
  
  get lastName(){  
    return this.registerform.get('lastName');  
  }  
  get email(){  
    return this.registerform.get('email');  
  }  
  
  get password(){  
    return this.registerform.get('password');  
  }  

  registerformInfo(){  
    this.user=new User();     
    this.user.firstName=this.firstName.value;  
    this.user.lastName=this.lastName.value;  
    this.user.email=this.email.value;  
    this.user.password=this.password.value;  
    this.save(this.user);
  }  
  
  
  save(user) {  
    this.userService.register(user).subscribe(
      data => console.log(data),
       error => {this.showErrorMessage = true},
       () => this.router.navigate(['/login']));  
  }  
  

}
