package ensa.ma.Ecommerce.controller;


import ensa.ma.Ecommerce.model.Category;
import ensa.ma.Ecommerce.model.dataTransferObjects.ProductDto;
import ensa.ma.Ecommerce.model.dataTransferObjects.RegistrationRequest;
import ensa.ma.Ecommerce.model.User;
import ensa.ma.Ecommerce.model.dataTransferObjects.UpdateUserDto;
import ensa.ma.Ecommerce.service.UserService;
import ensa.ma.Ecommerce.util.ApiResponse;
import ensa.ma.Ecommerce.util.Helper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "http://localhost:4200")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @GetMapping("/allUsers")
    public ResponseEntity<List<User>> getUsers() {
        List<User> body = userService.listUsers();
        return new ResponseEntity<List<User>>(body, HttpStatus.OK);
    }

    @RequestMapping(value = "/currentUser", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Optional<User> getLoggedinUser() {
        return userService.getCurrentUser();
    }


    @PostMapping("/register")
    public User register(@RequestBody RegistrationRequest request) {
        return userService.register(request);
    }


    @GetMapping("/validateLogin")
    public Principal user(Principal user) {
        return user;
    }


    @PostMapping("/update/{userID}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable("userID") Long userID, @RequestBody @Valid UpdateUserDto user) {
        userService.updateUser(user,userID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "Product has been updated"), HttpStatus.OK);
    }


    @DeleteMapping("/delete/{userID}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("userID") Long userID){
        userService.deleteByID(userID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "User has been removed"), HttpStatus.OK);
    }


}
