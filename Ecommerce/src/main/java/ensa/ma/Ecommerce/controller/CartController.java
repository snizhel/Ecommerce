package ensa.ma.Ecommerce.controller;

import ensa.ma.Ecommerce.model.Product;
import ensa.ma.Ecommerce.model.User;
import ensa.ma.Ecommerce.model.dataTransferObjects.AddToCartDto;
import ensa.ma.Ecommerce.model.dataTransferObjects.CartDto;
import ensa.ma.Ecommerce.service.CartService;
import ensa.ma.Ecommerce.service.ProductService;
import ensa.ma.Ecommerce.service.UserService;
import ensa.ma.Ecommerce.util.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping(path = "/cart")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class CartController {

    private CartService cartService;

    private UserService userService;

    private ProductService productService;

    @PostMapping("/add")
    public ResponseEntity<ApiResponse> addToCart(@RequestBody AddToCartDto addToCartDto) throws IOException {
        Optional<User> user = userService.getCurrentUser();
        User user1 = user.get();
        Product product = productService.getProductById(addToCartDto.getProductId());
        System.out.println("product to add"+  product.getName());
        cartService.addToCart(addToCartDto, product, user1);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Added to cart"), HttpStatus.CREATED);

    }
    @GetMapping("/myCart")
    public ResponseEntity<CartDto> getCartItems() throws IOException {
        Optional<User> user = userService.getCurrentUser();
        CartDto cartDto = cartService.listCartItems(user);
        return new ResponseEntity<CartDto>(cartDto,HttpStatus.OK);
    }
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<ApiResponse> updateCartItem(@RequestBody @Valid AddToCartDto cartDto) throws IOException {
        Optional<User> user = userService.getCurrentUser();
        Product product = productService.getProductById(cartDto.getProductId());
        cartService.updateCartItem(cartDto, user,product);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "CartItem has been updated"), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable("cartItemId") Long itemID) throws IOException {
        Long userId = userService.getCurrentUser().get().getId();
        cartService.deleteCartItem(itemID, userId);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Item has been removed"), HttpStatus.OK);
    }


}
