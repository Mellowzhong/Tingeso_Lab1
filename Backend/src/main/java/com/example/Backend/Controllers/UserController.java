package com.example.Backend.Controllers;

import com.example.Backend.Entities.User;
import com.example.Backend.Forms.UserRequestDataForm;
import com.example.Backend.Response.UserRequestDataResponse;
import com.example.Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/post")
    public void createUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return userService.getUser();
    }

    @PutMapping("/update/{user_id}")
    public void updateUser(@RequestBody User user, @PathVariable UUID user_id) {
        userService.updateUser(user, user_id);
    }

    @DeleteMapping("/delete/{user_id}")
    public void deleteUser(@PathVariable UUID user_id) {
        userService.deleteUser(user_id);
    }

    @PostMapping("/get")
    public UserRequestDataResponse getUserByUserData(@RequestBody UserRequestDataForm userRequestDataForm) {
        System.out.println(userRequestDataForm.toString());
        return userService.getUserByData(userRequestDataForm);
    }
}
