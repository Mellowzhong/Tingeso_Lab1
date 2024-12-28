package com.example.Backend.Services;

import com.example.Backend.Entities.User;
import com.example.Backend.Forms.UserRequestDataForm;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Response.UserRequestDataResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<User> addUser(User user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        Optional<User> getterUser = userRepository.findByFirstNameAndLastNameAndRut(user.getFirstName(), user.getLastName(), user.getRut());

        if (getterUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        User savedUser = userRepository.save(user);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    public List<User> getUser(){
        return userRepository.findAll();
    }

    public UserRequestDataResponse getUserByData(UserRequestDataForm userRequestDataForm){
        String FirstName = userRequestDataForm.getFirstName();
        String LastName = userRequestDataForm.getLastName();
        String Rut = userRequestDataForm.getRut();
        Optional<User> getterUser = userRepository.findByFirstNameAndLastNameAndRut(FirstName, LastName, Rut);

        if(getterUser.isPresent()){
            UserRequestDataResponse userRequestDataResponse = UserRequestDataResponse.builder()
                    .id(getterUser.get().getId())
                    .firstName(getterUser.get().getFirstName())
                    .lastName(getterUser.get().getLastName())
                    .build();

            return userRequestDataResponse;
        }
        return null;
    }
}
