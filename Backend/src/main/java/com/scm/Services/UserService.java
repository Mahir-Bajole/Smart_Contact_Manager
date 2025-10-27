package com.scm.Services;

import com.scm.Entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User SaveUser(User user);
    Optional<User> getUserByEmail(String email);
    Optional<User> UpdateUser(User user);
    void deleteuser(String Id);
    boolean issUserexist(String userid);
    boolean issUserexistByeamil(String email);
    List<User> getAllusers();



}
