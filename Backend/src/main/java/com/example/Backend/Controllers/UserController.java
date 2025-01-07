package com.example.Backend.Controllers;

import com.example.Backend.Entities.User;
import com.example.Backend.Forms.UserRequestDataForm;
import com.example.Backend.Response.UserRequestDataResponse;
import com.example.Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getUser();
    }

    @PostMapping("/get")
    public UserRequestDataResponse getUserByUserData(@RequestBody UserRequestDataForm userRequestDataForm) {
        return userService.getUserByData(userRequestDataForm);
    }
}
