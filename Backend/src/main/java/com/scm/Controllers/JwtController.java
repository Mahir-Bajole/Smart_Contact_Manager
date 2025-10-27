package com.scm.Controllers;


import com.scm.Services.Implementation.SecurityCustomUserService;
import com.scm.forms.JwtResponse;
import com.scm.forms.Userlogin;
import com.scm.helpers.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtController {

    @Autowired
    private SecurityCustomUserService securityCustomUserService;

    @Autowired
    private JwtUtils jwtUtils;

        @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/token")
    public ResponseEntity<?> generateToken(@RequestBody Userlogin userlogin) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userlogin.getEmail(), userlogin.getPassword())
            );
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }


        UserDetails userDetails = securityCustomUserService.loadUserByUsername(userlogin.getEmail());
        String token = jwtUtils.generateJwtToken(userDetails.getUsername());

        String email = jwtUtils.getUsernameFromJwtToken(token);
        System.out.println("Extracted email from token: " + email);

        return ResponseEntity.ok( new JwtResponse(token));
    }

}
