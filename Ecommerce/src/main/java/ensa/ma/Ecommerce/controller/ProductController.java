package ensa.ma.Ecommerce.controller;

import ensa.ma.Ecommerce.model.Category;
import ensa.ma.Ecommerce.model.dataTransferObjects.ProductDto;
import ensa.ma.Ecommerce.service.CategoryService;
import ensa.ma.Ecommerce.service.ProductService;
import ensa.ma.Ecommerce.service.UserService;
import ensa.ma.Ecommerce.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/product")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class ProductController {

    private ProductService productService;
    private CategoryService categoryService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getProducts() {
        List<ProductDto> body = productService.listProducts();
        return new ResponseEntity<List<ProductDto>>(body, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addProduct(@RequestBody ProductDto productDto) {
        Optional<Category> optionalCategory = categoryService.readCategory(productDto.getCategoryId());
        if (!((Optional<?>) optionalCategory).isPresent()) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "category is invalid"), HttpStatus.CONFLICT);
        }
        Category category = optionalCategory.get();
        productService.addProduct(productDto, category);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been added"), HttpStatus.CREATED);
    }

    @PostMapping("/update/{productID}")
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable("productID") Long productID, @RequestBody @Valid ProductDto productDto) {
        Optional<Category> optionalCategory = categoryService.readCategory(productDto.getCategoryId());
        if (!optionalCategory.isPresent()) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "category is invalid"), HttpStatus.CONFLICT);
        }
        Category category = optionalCategory.get();
        productService.updateProduct(Long.valueOf(productID), productDto, category);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been updated"), HttpStatus.OK);
    }


    @DeleteMapping("/delete/{productID}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("productID") Long productID){
        productService.deleteByID(productID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been removed"), HttpStatus.OK);
    }


}
