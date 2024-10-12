package com.example.Backend.Services;

import com.example.Backend.Entities.User;
import com.example.Backend.Forms.UserRequestDataForm;
import com.example.Backend.Repositories.UserRepository;
import com.example.Backend.Response.UserRequestDataResponse;
import org.springframework.beans.factory.annotation.Autowired;
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

    public void addUser(User user){
        userRepository.save(user);
    }

    public List<User> getUser(){
        return userRepository.findAll();
    }

    public void updateUser(User user, UUID user_id){
        Optional<User> optionalUser = userRepository.findById(user_id);
        if(optionalUser.isPresent()){
            user.setId(user_id);
            userRepository.save(user);
        }
    }

    public void deleteUser(UUID user_id){
        userRepository.deleteById(user_id);
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
