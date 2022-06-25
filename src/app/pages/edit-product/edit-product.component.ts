import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { Product } from 'src/app/interface/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(private route:ActivatedRoute,private productService:ProductService,private router:Router,private http: HttpClient,
    private categoryService:CategoryService) { }

  idCurrentProduct:number
  product:Product;
  productUpdated:Product;
  showErrorMessage = false;

  categories:Category[];
  cateogry:Category;


  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params)=>{
          this.idCurrentProduct=params['idProduct'];
    

  });

  this.getProductById(this.idCurrentProduct);
}

getAllCategories(){
  this.categoryService.getCategories().subscribe(
    (response:any)=>{
      console.log(response)
      this.categories=response;
    }
  )
}

getProductById(id:number){
  this.productService.getProductById(id).subscribe(
    (response:any) => {
        console.log(response),
        this.product=response
      });
    }

    updateForm=new FormGroup({ 
      id:new FormControl('' , [Validators.required ] ),
      name:new FormControl('' , [Validators.required , Validators.minLength(2) ] ), 
      price:new FormControl('' , [Validators.required ] ),
      imageURL:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
      description:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
      categoryId:new FormControl('' , [Validators.required  ] ),
     
    });  

  
    get name(){  
      return this.updateForm.get('name');  
    }  

    get id(){  
      return this.updateForm.get('id');  
    }  

    get price(){  
      return this.updateForm.get('price');  
    } 
    
    get imageURL(){  
      return this.updateForm.get('imageURL');  
    }  
    

    get description(){  
      return this.updateForm.get('description');  
    }  
    

    get categoryId(){  
      return this.updateForm.get('categoryId');  
    }  
    
    
  
    updateformInfo(){  
      this.productUpdated=new Product();  

      this.productUpdated.id=this.idCurrentProduct;
      this.productUpdated.name=this.name.value;  
      this.productUpdated.price=this.price.value; 
      this.productUpdated.imageURL=this.imageURL.value; 
      this.productUpdated.description=this.description.value; 
      this.productUpdated.categoryId=this.categoryId.value; 

      console.log(this.idCurrentProduct) ;
      console.log(this.categoryId.value);
      this.save(this.idCurrentProduct,this.productUpdated);
    }  
    
    save(id,product:Product) {  
      this.productService.updateProduct(id,product).subscribe(
        data => console.log(data),
         error => {this.showErrorMessage = true},
         () => this.router.navigate(['/adminPanel']));  
    }  

}
