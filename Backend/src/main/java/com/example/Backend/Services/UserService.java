package com.example.Backend.Services;

import com.example.Backend.Entities.User;
import com.example.Backend.Forms.UserLoginForm;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Response.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void addUser(User user){
        userRepository.save(user);
    }

    public List<User> getUser(){
        return userRepository.findAll();
    }

    public void updateUser(User user, Long user_id){
        Optional<User> optionalUser = userRepository.findById(user_id);
        if(optionalUser.isPresent()){
            user.setId(user_id);
            userRepository.save(user);
        }
    }

    public void deleteUser(Long user_id){
        userRepository.deleteById(user_id);
    }

    public ResponseEntity<UserResponse> loginUser(UserLoginForm userLoginForm){
        String rut = userLoginForm.getRut();
        String password = userLoginForm.getPassword();

        Optional<User> optionalUser = userRepository.findByRutAndPassword(rut, password);
        if(optionalUser.isPresent()){
            UserResponse userResponse = new UserResponse();
            userResponse.setRut(rut);
            userResponse.setFirst_name(optionalUser.get().getFirst_name());
            userResponse.setLast_name(optionalUser.get().getLast_name());
            return new ResponseEntity<>(userResponse, HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
