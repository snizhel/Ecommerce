package ensa.ma.Ecommerce.controller;

import ensa.ma.Ecommerce.model.Category;
import ensa.ma.Ecommerce.model.Product;
import ensa.ma.Ecommerce.service.CategoryService;
import ensa.ma.Ecommerce.service.ProductService;
import ensa.ma.Ecommerce.util.ApiResponse;
import ensa.ma.Ecommerce.util.Helper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/category")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CategoryController {

    private CategoryService categoryService;

    @GetMapping("/allCats")
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> body = categoryService.listCategories();
        return new ResponseEntity<List<Category>>(body, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createCategory(@Valid @RequestBody Category category) {
        if (Helper.notNull(categoryService.readCategory(category.getCategoryName()))) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "category already exists"), HttpStatus.CONFLICT);
        }
        categoryService.createCategory(category);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "created the category"), HttpStatus.CREATED);
    }

    @PostMapping("/update/{categoryID}")
    public ResponseEntity<ApiResponse> updateCategory(@PathVariable("categoryID") Long categoryID, @Valid @RequestBody Category category) {
        // Check to see if the category exists.
        if (Helper.notNull(categoryService.readCategory(categoryID))) {
            // If the category exists then update it.
            categoryService.updateCategory(categoryID, category);
            return new ResponseEntity<ApiResponse>(new ApiResponse(true, "updated the category"), HttpStatus.OK);
        }
        // If the category doesn't exist then return a response of unsuccessful.
        return new ResponseEntity<ApiResponse>(new ApiResponse(false, "category does not exist"), HttpStatus.NOT_FOUND);
    }


    @DeleteMapping("/delete/{categoryID}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("categoryID") Long categoryID){
        categoryService.deleteByID(categoryID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Category has been removed"), HttpStatus.OK);
    }


}
