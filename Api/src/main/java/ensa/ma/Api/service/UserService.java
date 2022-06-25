package ensa.ma.Api.service;

import ensa.ma.Api.model.Category;
import ensa.ma.Api.model.dataTransferObjects.RegistrationRequest;
import ensa.ma.Api.model.dataTransferObjects.UpdateUserDto;
import ensa.ma.Api.model.enumFolder.UserRole;
import ensa.ma.Api.repos.UserRepository;
import ensa.ma.Api.model.User;
import ensa.ma.Api.util.EmailValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final String USER_NOT_FOUND= "user with email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private EmailValidator emailValidator;

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(()->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND,email)));
    }


    public Optional<User> getCurrentUser(){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = ((UserDetails)principal).getUsername();

        return userRepository.findByEmail(email);
    }

  public Optional<User> getUserById(Long userID) {
      return userRepository.findById(userID);
  }


    public User signUpUser(User user){

        boolean userExists= userRepository.findByEmail(user.getEmail()).isPresent();

        if(userExists){
            throw new IllegalStateException("email already taken");
        }

        String encodedPassword=  bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        userRepository.save(user);

        return user;
    }



    public  User register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.
                test(request.getEmail());

        if(!isValidEmail){
            throw new IllegalStateException("email not valid");
        }

        return signUpUser(
                new User(
                        request.getFirstName(),
                        request.getLastName(),
                        request.getEmail(),
                        request.getPassword(),
                        request.getEmail(),
                        UserRole.USER
                )
        );
    }

    public void updateUser(UpdateUserDto request, Long userID) {

        Optional<User> user= userRepository.findById(userID);
        User user1 = user.get();

        user1.setFirstName(request.getFirstName());
        user1.setLastName(request.getLastName());
        user1.setEmail(request.getEmail());
        user1.setUsername(request.getUsername());
        user1.setUserRole(UserRole.valueOf(request.getUserRole()));

        userRepository.save(user1);
    }


    public void deleteByID(Long productID) {
        userRepository.deleteById(productID);
    }



}
