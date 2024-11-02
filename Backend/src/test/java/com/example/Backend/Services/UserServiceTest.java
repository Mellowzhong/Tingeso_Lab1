package com.example.Backend.Services;

import com.example.Backend.Entities.User;
import com.example.Backend.Repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.example.Backend.Response.UserRequestDataResponse;
import com.example.Backend.Forms.UserRequestDataForm;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user1;
    private User user2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        user1 = new User();
        user1.setId(UUID.randomUUID());
        user1.setFirstName("mellow");
        user1.setLastName("zhong");
        user1.setAddress("Libertad");
        user1.setRut("21251596-5");
        user1.setAge(21);

        user2 = new User();
        user2.setId(UUID.randomUUID());
        user2.setFirstName("Ignacio");
        user2.setLastName("Lara");
        user2.setAddress("Carlos antunez");
        user2.setRut("20.946.887-5");
        user2.setAge(22);
    }

//  addUser tests
    @Test
    void addUser_shouldSaveUserSuccessfully() {
        userService.addUser(user1);
        verify(userRepository, times(1)).save(user1);
    }

    @Test
    void addUser_shouldNotThrowExceptionWhenSaving() {
        assertDoesNotThrow(() -> userService.addUser(user1));
    }

    @Test
    void addUser_shouldSaveDifferentUsersSuccessfully() {
        userService.addUser(user1);
        verify(userRepository, times(1)).save(user1);

        userService.addUser(user2);
        verify(userRepository, times(1)).save(user2);
    }

    @Test
    void addUser_shouldHandleNullUserGracefully() {
        assertThrows(IllegalArgumentException.class, () -> userService.addUser(null));
    }

//    getUser tests
    @Test
    void getUser_shouldReturnAllUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));
        List<User> users = userService.getUser();

        assertEquals(2, users.size());
        assertTrue(users.contains(user1));
        assertTrue(users.contains(user2));
    }

    @Test
    void getUser_shouldReturnEmptyListWhenNoUsers() {
        when(userRepository.findAll()).thenReturn(new ArrayList<>());
        List<User> users = userService.getUser();

        assertTrue(users.isEmpty());
    }

    @Test
    void getUser_shouldReturnCorrectNumberOfUsers() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1));
        List<User> users = userService.getUser();

        assertEquals(1, users.size());
    }

    @Test
    void getUser_shouldNotBeNullEvenIfNoUsersExist() {
        when(userRepository.findAll()).thenReturn(new ArrayList<>());
        List<User> users = userService.getUser();

        assertNotNull(users);
    }

//    getUserByData tests
    @Test
    void getUserByData_shouldReturnCorrectUserWhenExists() {
        UserRequestDataForm form = new UserRequestDataForm("mellow", "zhong", "21251596-5");

        when(userRepository.findByFirstNameAndLastNameAndRut("mellow", "zhong", "21251596-5"))
                .thenReturn(Optional.of(user1));

        UserRequestDataResponse response = userService.getUserByData(form);

        assertNotNull(response);
        assertEquals(user1.getId(), response.getId());
    }

    @Test
    void getUserByData_shouldReturnNullWhenNoMatchingUser() {
        UserRequestDataForm form = new UserRequestDataForm("nonexistent", "user", "00000000-0");

        when(userRepository.findByFirstNameAndLastNameAndRut("nonexistent", "user", "00000000-0"))
                .thenReturn(Optional.empty());

        UserRequestDataResponse response = userService.getUserByData(form);

        assertNull(response);
    }

    @Test
    void getUserByData_shouldHandleNullFieldsGracefully() {
        UserRequestDataForm form = new UserRequestDataForm(null, null, null);

        when(userRepository.findByFirstNameAndLastNameAndRut(null, null, null))
                .thenReturn(Optional.empty());

        UserRequestDataResponse response = userService.getUserByData(form);

        assertNull(response);
    }

    @Test
    void getUserByData_shouldReturnCorrectFieldsInResponse() {
        UserRequestDataForm form = new UserRequestDataForm("mellow", "zhong", "21251596-5");

        when(userRepository.findByFirstNameAndLastNameAndRut("mellow", "zhong", "21251596-5"))
                .thenReturn(Optional.of(user1));

        UserRequestDataResponse response = userService.getUserByData(form);

        assertEquals("mellow", response.getFirstName());
        assertEquals("zhong", response.getLastName());
    }
}