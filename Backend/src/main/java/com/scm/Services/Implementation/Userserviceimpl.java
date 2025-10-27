package com.scm.Services.Implementation;

import com.scm.Entities.User;
import com.scm.Repositories.UserRepo;
import com.scm.Services.UserService;
import com.scm.helpers.AppContants;
import com.scm.helpers.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class Userserviceimpl implements UserService {

    @Autowired
    UserRepo userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User SaveUser(User user) {
        String userid= UUID.randomUUID().toString();
        user.setUserId(userid);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRolelist(new ArrayList<>(List.of(AppContants.ROLE_USER)));
        return userRepo.save(user);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {

        return Optional.ofNullable(userRepo.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not Found")));
    }

    @Override
    public Optional<User> UpdateUser(User user) {
        User user1=userRepo.findById(user.getUserId()).orElseThrow(()->new ResourceNotFoundException("User Not Found"));
        user1.setName(user.getName());
        user1.setEmail(user.getEmail());
        user1.setPassword(user.getPassword());
        user1.setAbout(user.getAbout());
        user1.setProfilepic(user.getProfilepic());
        user1.setIsenabled(user.getIsenabled());
        user1.setEmailVerified(user.getEmailVerified());
        user1.setPhoneVerified(user.getPhoneVerified());
        user1.setProvider(user.getProvider());
        user1.setProviderUserId(user.getProviderUserId());
        User saved=userRepo.save(user1);
        return Optional.ofNullable(saved);






    }

    @Override
    public void deleteuser(String Id) {
        User user=userRepo.findById(Id).orElseThrow(()->new ResourceNotFoundException("Not Found"));
        userRepo.delete(user);




    }

    @Override
    public boolean issUserexist(String userid) {
       User user= userRepo.findById(userid).orElse(null);

        return user!=null?true:false;
    }

    @Override
    public boolean issUserexistByeamil(String email) {
        User user=userRepo.findByEmail(email).orElse(null);

        return user!=null?true:false;
    }

    @Override
    public List<User> getAllusers() {
        List<User> users=userRepo.findAll();

        return users;
    }
}
