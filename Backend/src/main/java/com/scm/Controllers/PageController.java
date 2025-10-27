package com.scm.Controllers;


import com.scm.Entities.User;
import com.scm.Services.FileuploaadService;
import com.scm.Services.UserService;
import com.scm.forms.Userforms;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PageController {

    @Autowired
    UserService userService;

    @Autowired
    FileuploaadService fileuploaadService;




    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<String> processregister(
            @RequestPart("image") MultipartFile picture,
            @RequestPart("name") String name,
            @RequestPart("email") String email,
            @RequestPart("password") String password,
            @RequestPart("about") String about) throws IOException {

        User newuser = new User();
        newuser.setName(name);
        newuser.setPassword(password);
        newuser.setEmail(email);
        newuser.setAbout(about);
        String fileUrl="";

        if (picture != null && !picture.isEmpty()) {
            System.out.println("Image Name: " + picture.getOriginalFilename());
            fileUrl=fileuploaadService.uploadimage(picture);

        } else {
            System.out.println("No image uploaded.");
        }

        newuser.setProfilepic(fileUrl);



        userService.SaveUser(newuser);
        System.out.println("User is saved");

        return ResponseEntity.ok().body("/login");

    }

    @GetMapping("/check")
    public ResponseEntity<?> checkAuth(Principal principal) {
        System.out.println("hello cjheck");
        if (principal != null) {
            return ResponseEntity.ok("Authenticated");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Authenticated");
        }
    }

    @PostMapping("/authenticate")
    public void testAuth(HttpServletRequest request) {
        System.out.println("User: " + request.getUserPrincipal());
    }

    @GetMapping("/welcome")
    public String checking(HttpServletRequest request) {
        return "Hello";
    }






}

