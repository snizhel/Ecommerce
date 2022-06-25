import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/interface/category';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private route:ActivatedRoute,private categoryService:CategoryService,private router:Router,private http: HttpClient) { }

  idCurrentCategory:number
  category:Category;
  categoryUpdated:Category;
  showErrorMessage = false;

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params)=>{
          this.idCurrentCategory=params['id'];
    

  });

  this.getCategoryById(this.idCurrentCategory);
}

getCategoryById(id:number){
  this.categoryService.getCategoryById(id).subscribe(
    (response:any) => {
        console.log(response),
        this.category=response
      });
    }

    updateForm=new FormGroup({ 
      id:new FormControl('' , [Validators.required ] ),
      categoryName:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),  
    });  

  
    get categoryName(){  
      return this.updateForm.get('categoryName');  
    }  

    get id(){  
      return this.updateForm.get('id');  
    }  
    
  
    updateformInfo(){  
      this.categoryUpdated=new Category();     
      this.categoryUpdated.id=this.id.value;   
      this.categoryUpdated.categoryName=this.categoryName.value;   
      this.save(this.categoryUpdated,this.idCurrentCategory);
    }  
    
    save(category:object,id) {  
      this.categoryService.updateCategory(category,id).subscribe(
        data => console.log(data),
         error => {this.showErrorMessage = true},
         () => this.router.navigate(['/adminPanel']));  
    }  





}
