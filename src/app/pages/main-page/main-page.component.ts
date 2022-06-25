import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddToCart } from 'src/app/interface/addToCart';
import { Cart } from 'src/app/interface/cart';
import { Product } from 'src/app/interface/product';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartService } from 'src/app/service/cart.service';
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

  categories=[];


  products=[];
  prudct:Product;
 // productId:number;

  myCart:Cart;
  addToCart:AddToCart

	constructor( private router: Router, private http: HttpClient, private authService: AuthenticationService,
    private userService:UserService,private productService:ProductService,private cartService:CartService
    ,private categoryService:CategoryService) {}

	ngOnInit() {
		this.isLoggedin = this.authService.isUserLoggedin();
		this.loggedinUser = this.authService.getLoggedinUser();

    if(!this.isLoggedin) {
			this.router.navigateByUrl('/login');
		}

    this.getCurrentUser();
    this.getAllProducts();
    this.getAllCategories();
    this.getMyCart();

    }


    getAllCategories(){
      this.categoryService.getCategories().subscribe(
        (response:any)=>{
          console.log(response)
          this.categories=response;
        }
      )
    }
    

    //*************************************************************Cart */
    getMyCart(){
      this.cartService.getMyCart().subscribe(
        (response:any)=>{
          console.log(response)
          this.myCart=response;
        }
      )
    }

  


    addCartItem=new FormGroup({  
      id:new FormControl('' ),
      quantity:new FormControl('' , [Validators.required  ] ), 
      productId:new FormControl('' , [Validators.required  ] ), 

    });  

    get id(){  
      return this.addCartItem.get('id');  
    }  
    get quantity(){  
      return this.addCartItem.get('quantity');  
    }  
    get productId(){  
      return this.addCartItem.get('productId');  
    }  
  
    addCartItemInfo(productId:number){  
      this.addToCart=new AddToCart();     
      this.addToCart.id=this.productId.value;
      this.addToCart.productId=productId;
      this.addToCart.quantity=this.quantity.value; 
      this.add(this.addToCart);
    }    
    
    add(addToCart) {  
      this.cartService.add(addToCart).subscribe(
        data => console.log(data),
         error => {},
         () => {
          this.getMyCart();});  
    }  


    //*********************************************************************************************** */

    getAllProducts(){
      this.productService.getProducts().subscribe(
        (response:any)=>{
          console.log(response)
          this.products=response;
        }
      )
    }

    getAllProductsByKeyWord(keyWord:string){
      if(keyWord==""){
        this.getAllProducts();
      }else{
      this.productService.getProductsByWordLike(keyWord).subscribe(
        (response:any)=>{
          this.products=response;
        }
      )
    }
    }
    

    getAllProductsByIdCategory(idCategory:number){
      this.productService.getPorudctsByCategoryId(idCategory).subscribe(
        (response:any)=>{
          this.products=response;
        }
      )
    }



    getCurrentUser(){
      this.userService.getCurrentUser().subscribe(
        (response:any) => {
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
