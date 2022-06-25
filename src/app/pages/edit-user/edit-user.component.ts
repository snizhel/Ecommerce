import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { User } from 'src/app/interface/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private userService:UserService,private router:Router,private http: HttpClient) { }

  idCurrentUser:number
  user:User;
  userUpdated:User;
  showErrorMessage = false;
  

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params)=>{
          this.idCurrentUser=params['id'];
    

  });

  this.getUserById(this.idCurrentUser);
}

getUserById(id:number){
  this.userService.getUserById(id).subscribe(
    (response:any) => {
        console.log(response),
        this.user=response
      });
    }

    updateForm=new FormGroup({ 
      id: new FormControl('',[Validators.required ]),
      firstName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),  
      lastName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ), 
      email:new FormControl('',[Validators.required,Validators.email]),   
      userRole:new FormControl('' , [Validators.required , Validators.minLength(2) ] )
    });  

    get id(){
      return this.updateForm.get('id');
    }
    
    get firstName(){  
      return this.updateForm.get('firstName');  
    }  
    
    get lastName(){  
      return this.updateForm.get('lastName');  
    }  
    get email(){  
      return this.updateForm.get('email');  
    }  
    
    get username(){
      return this.updateForm.get('username');
    }

    get userRole(){  
      return this.updateForm.get('userRole');  
    }  

  
    updateformInfo(){  
      this.userUpdated=new User();       
      this.userUpdated.id=this.id.value;
      this.userUpdated.firstName=this.firstName.value;  
      this.userUpdated.lastName=this.lastName.value;   
      this.userUpdated.email=this.email.value;
      this.userUpdated.username=this.email.value; 
      this.userUpdated.userRole=this.userRole.value;   
      this.save(this.userUpdated,this.id);
    }  
    
    save(user:object,id) {  
      this.userService.update(user,id).subscribe(
        data => console.log(data),
         error => {this.showErrorMessage = true},
         () => this.router.navigate(['/adminPanel']));  
    }  

}
