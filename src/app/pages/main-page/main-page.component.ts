import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interface/product';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  isLoggedin = false;
	loggedinUser: string = '';

  user:User;


  products=[];
  prudct:Product;

	constructor( private router: Router, private http: HttpClient, private authService: AuthenticationService,
    private userService:UserService,private productService:ProductService) {}

	ngOnInit() {
		this.isLoggedin = this.authService.isUserLoggedin();
		this.loggedinUser = this.authService.getLoggedinUser();

    if(!this.isLoggedin) {
			this.router.navigateByUrl('/login');
		}

    this.getCurrentUser();
    this.getAllProducts();

    }

    getAllProducts(){
      this.productService.getProducts().subscribe(
        (response:any)=>{
          console.log(response)
          this.products=response;
        }
      )
    }

    getCurrentUser(){
      this.userService.getCurrentUser().subscribe(
        (response:any) => {
            console.log(response),
            this.user=response
          },error => {
            console.log('error: ', error)
         },() =>console.log("completed"));
    }


  

	doLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

}
