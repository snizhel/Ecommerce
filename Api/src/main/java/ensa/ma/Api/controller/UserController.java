package ensa.ma.Api.controller;


import ensa.ma.Api.model.Category;
import ensa.ma.Api.model.dataTransferObjects.RegistrationRequest;
import ensa.ma.Api.model.User;
import ensa.ma.Api.model.dataTransferObjects.UpdateUserDto;
import ensa.ma.Api.service.UserService;
import ensa.ma.Api.util.ApiResponse;
import ensa.ma.Api.util.Helper;
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

    @GetMapping("/userBy/{userID}")
    public ResponseEntity<User> UserbyId(@PathVariable("userID") Long userID){
      Optional<User> user1 = userService.getUserById(userID);
      User user = new User();
      user = user1.get();
      return new ResponseEntity<User>(user,HttpStatus.OK);

    }


  @PostMapping("/update/{userID}")
  public ResponseEntity<ApiResponse> updateCategory(@PathVariable("userID") Long userID, @RequestBody UpdateUserDto user) {
    // Check to see if the category exists.
    if (Helper.notNull(userService.getUserById(userID))) {
      // If the category exists then update it.
      userService.updateUser(user, userID);
      return new ResponseEntity<ApiResponse>(new ApiResponse(true, "updated the category"), HttpStatus.OK);
    }
    // If the category doesn't exist then return a response of unsuccessful.
    return new ResponseEntity<ApiResponse>(new ApiResponse(false, "category does not exist"), HttpStatus.NOT_FOUND);
  }



    @DeleteMapping("/delete/{userID}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable("userID") Long userID){
        userService.deleteByID(userID);
        return new ResponseEntity<ApiResponse>(new ApiResponse(true, "User has been removed"), HttpStatus.OK);
    }


}
