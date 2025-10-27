package com.scm.Controllers;


import com.scm.Entities.User;
import com.scm.Repositories.UserRepo;
import com.scm.Services.UserService;
import com.scm.forms.Changepassdata;
import com.scm.forms.EmailRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    UserRepo userRepo;







    @GetMapping("/dashboard")
    public ResponseEntity<String> sendtodashboard(){

        return ResponseEntity.ok().body("http://localhost:5173/user/dashboard");

    }

    @PostMapping("/profile")
    public ResponseEntity<?> getUser(@RequestBody EmailRequest emailRequest) {
        try {

            System.out.println(emailRequest.getEmail()+"is it null");

            Optional<User> user = userService.getUserByEmail(emailRequest.getEmail());
            System.out.println(user.get().getName());
            System.out.println(user.get().getEmail());
            System.out.println(user.get().getProfilepic());

            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());  // ✅ return the user if found
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("error1");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @Transactional
    @PostMapping("/changepassword")
    public ResponseEntity<String> changepassword(@RequestBody Changepassdata changepassdata, Principal principal) {

        String username = principal.getName();

        // Fetch the user by email (username)
        User user = userService.getUserByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Verify if the current password matches the stored password
        if (!passwordEncoder.matches(changepassdata.getCurrentPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Current password is incorrect");
        }

        // Encode the new password and update the user's password
        String encodedNewPassword = passwordEncoder.encode(changepassdata.getNewPassword());
        user.setPassword(encodedNewPassword);
       Optional<User> user1= userRepo.findByEmail(username);
       User user2=user1.get();

       String i=user2.getUserId();

       user.setUserId(i);

        // Save the updated user
        userRepo.save(user);

        return ResponseEntity.ok().body("Password changed successfully");
    }





}
