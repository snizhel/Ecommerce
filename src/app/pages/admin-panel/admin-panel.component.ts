import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { Product } from 'src/app/interface/product';
import { User } from 'src/app/interface/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService,
    private userService:UserService,private categoryService:CategoryService,private productService : ProductService) { }

  users=[];
  user:User;

  products=[];
  product:Product;
  
  categories=[];
  categoriy:Category;
  currentCategory:Category;
  numberOfProducts:number;
  
  isProductOn=true;
  isCategoryOn=false;
  isLoggedin = false;
	loggedinUser: string = '';

  showErrorMessage= false;

  ngOnInit(): void {

    this.isLoggedin = this.authService.isUserLoggedin();
		this.loggedinUser = this.authService.getLoggedinUser();

    if(!this.isLoggedin) {
			this.router.navigateByUrl('/login');
		}

    this.getAllUsers(); 
    this.getAllCategories();
    this.getAllProducts();
    this.getCurrentUser();

  }

  //***********************************************User */

  getCurrentUser(){
  this.userService.getCurrentUser().subscribe(
    (response:any) => {
        console.log(response),
        this.user=response
      },error => {
        console.log('error: ', error)
     },() =>console.log("completed"));
    }

  getAllUsers() {
  this.userService.getAllUsers().subscribe(
    (response:any)=>{
      console.log(response)
      this.users=response;
    });
  }


  DeleteUserById(id : number) {
    this.userService.deleteUser(id)
      .subscribe(()=>this.getAllUsers())
  }

  GotoEditUser(id:number){
    this.router.navigate(['/editUser', id]);
  }

  //***********************************************Category */

  getAllCategories(){
    this.categoryService.getCategories().subscribe(
      (response:any)=>{
        console.log(response)
        this.categories=response;
      }
    )
  }

  getCategoryById(id:number){
    this.categoryService.getCategoryById(id).subscribe(
      (response:any) => {
          console.log(response),
          this.currentCategory=response
        });

        return this.currentCategory.categoryName;
      }


  createCategoryForm=new FormGroup({  
    categoryName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),   
  });  
  

  get categoryName(){  
    return this.createCategoryForm.get('categoryName');  
  }  
  

  CreateCategoryInfo(){  
    this.categoriy=new Category();     
    this.categoriy.categoryName=this.categoryName.value;  
    this.save(this.categoriy);
  }    
  
  save(categoriy) {  
    this.categoryService.create(categoriy).subscribe(
      data => console.log(data),
       error => {this.showErrorMessage = true},
       () => {
        this.router.navigate(['/adminPanel']),
        this.getAllCategories();});  
  }  

  DeleteCategoryById(id : number) {
    this.categoryService.deleteCategory(id)
      .subscribe(()=>this.getAllCategories())
  }

  GotoEditCategory(id:number){
    this.router.navigate(['/editCategory', id]);
  }


  //***********************************************PRODUCT */

  getAllProducts(){
    this.productService.getProducts().subscribe(
      (response:any)=>{
        console.log(response)
        this.products=response;
      }
    )
  }

  createProductForm=new FormGroup({  
    name:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
    price:new FormControl('' , [Validators.required ] ),  
    imageURL:new FormControl('' , [Validators.required ] ),  
    description:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),  
    categoryId:new FormControl('' , [Validators.required ] ),   
  });  
  
  get id(){
    return this.createProductForm.get('id')
  }

  get name(){  
    return this.createProductForm.get('name');  
  } 
  
  get price(){  
    return this.createProductForm.get('price');  
  }  
  get imageURL(){  
    return this.createProductForm.get('imageURL');  
  }  
  get description(){  
    return this.createProductForm.get('description');  
  }  
  get categoryId(){  
    return this.createProductForm.get('categoryId');  
  }  
  

  CreateProductInfo(){  
    this.product=new Product(); 
   
    this.product.name=this.name.value; 
    this.product.price=this.price.value; 
    this.product.imageURL=this.imageURL.value; 
    this.product.description=this.description.value; 
    this.product.categoryId=this.categoryId.value; 
    this.saveProduct(this.product);
  }  
  
  
  saveProduct(product) {  
    this.productService.create(product).subscribe(
      data => console.log(data),
       error => {this.showErrorMessage = true},
       () => {
        this.router.navigate(['/adminPanel']),
        this.getAllProducts();});  
  }  

  DeleteProductById(id : number) {
    this.productService.deleteProduct(id)
      .subscribe(()=>this.getAllProducts())
  }

  GotoEditProduct(idProduct:number){
    this.router.navigate(['/editProduct', idProduct]);
  }

  doLogout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

}
