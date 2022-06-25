package ensa.ma.Api.controller;

import ensa.ma.Api.model.Category;
import ensa.ma.Api.model.Product;
import ensa.ma.Api.model.dataTransferObjects.ProductDto;
import ensa.ma.Api.service.CategoryService;
import ensa.ma.Api.service.ProductService;
import ensa.ma.Api.util.ApiResponse;
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

  @GetMapping("/productsByKey/{KeyWord}")
  public ResponseEntity<List<ProductDto>> getProductsByKeyWord(@PathVariable("KeyWord") String KeyWord) {
    List<ProductDto> body = productService.listProductsByWord(KeyWord);
    return new ResponseEntity<List<ProductDto>>(body, HttpStatus.OK);
  }

  @GetMapping("/productsByCategoryId/{categoryId}")
  public ResponseEntity<List<ProductDto>> getProductsByKeyWord(@PathVariable("categoryId") Long categoryId) {
    List<ProductDto> body = productService.listProductsByCategoryId(categoryId);
    return new ResponseEntity<List<ProductDto>>(body, HttpStatus.OK);
  }


  @GetMapping("/productBy/{productID}")
  public ResponseEntity<ProductDto> UserbyId(@PathVariable("productID") Long productID){
    Optional<ProductDto> product1 = productService.getProduct(productID);
    ProductDto product = new ProductDto();
    product = product1.get();
    return new ResponseEntity<ProductDto>(product,HttpStatus.OK);

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
    public ResponseEntity<ApiResponse> updateProduct(@PathVariable("productID") Long productID, @RequestBody ProductDto productDto) {
        Optional<Category> optionalCategory = categoryService.readCategory(Long.valueOf(productDto.getCategoryId()));
        if (!optionalCategory.isPresent()) {
            return new ResponseEntity<ApiResponse>(new ApiResponse(false, "Product is invalid"), HttpStatus.CONFLICT);
        }
        Category category = optionalCategory.get();
        productService.updateProduct(productID, productDto, category);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been updated"), HttpStatus.OK);
    }


    @DeleteMapping("/delete/{productID}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("productID") Long productID){
        productService.deleteByID(productID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been removed"), HttpStatus.OK);
    }


}
