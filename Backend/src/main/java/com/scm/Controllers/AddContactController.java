package com.scm.Controllers;


import com.scm.Entities.Contact;
import com.scm.Entities.SocialLink;
import com.scm.Entities.User;
import com.scm.Services.ContactService;
import com.scm.Services.EmailService;
import com.scm.Services.FileuploaadService;
import com.scm.Services.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.*;

@RestController
public class AddContactController {

    @Autowired
    UserService userService;

    @Autowired
    ContactService contactService;

    @Autowired
    FileuploaadService fileuploaadService;

    @Autowired
    EmailService emailService;


    @PostMapping("/user/add")
    public ResponseEntity<Map<String, String>> addNewContact(
            @RequestParam("name") String name,
            @RequestParam("contactemail") String contactemail,
            @RequestParam("phonenumber") String phonenumber,
            @RequestParam("description") String description,
            @RequestParam("address") String address,
            @RequestParam(value = "linkedin", required = false) String linkedin,
            @RequestParam(value = "github", required = false) String github,
            @RequestParam(value = "favorite", required = false, defaultValue = "false") boolean favorite,
            @RequestParam(value = "picture", required = false) MultipartFile picture) throws IOException {

        Contact contact = new Contact();
        contact.setId(UUID.randomUUID().toString());
        contact.setName(name);
        contact.setContactemail(contactemail);
        contact.setPhonenumber(phonenumber);
        contact.setAddress(address);
        contact.setDescritpion(description);
        contact.setFavorate(favorite);
        String fileUrl="";

        // 🖼️ Handle Image (for now, just print name)
        if (picture != null && !picture.isEmpty()) {
            System.out.println("Image Name: " + picture.getOriginalFilename());
             fileUrl=fileuploaadService.uploadimage(picture);

        } else {
            System.out.println("No image uploaded.");
        }

        contact.setPicture(fileUrl);

        // 🌐 Social Links
        List<SocialLink> social = new ArrayList<>();

        if (linkedin != null && !linkedin.isEmpty()) {
            SocialLink link = new SocialLink();
            link.setTitle("linkedin");
            link.setLink(linkedin);
            link.setContact(contact);
            social.add(link);
        }

        if (github != null && !github.isEmpty()) {
            SocialLink link = new SocialLink();
            link.setTitle("github");
            link.setLink(github);
            link.setContact(contact);
            social.add(link);
        }

        // 🔐 Authenticated User from Token
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        System.out.println("Authenticated email: " + email);

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        contact.setUser(user);
        contact.setSocialLinks(social);

        // Save contact if needed
         contactService.saveContact(contact);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Successfully added contact.");
        response.put("contactId", contact.getId());

        return ResponseEntity.ok(response);
    }

    @GetMapping("user/allcontact")
    public ResponseEntity<List<Contact>> findalluser(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        System.out.println("Authenticated email: " + email);

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));





        return ResponseEntity.ok().body(contactService.getByUserId(user.getUserId()));
    }

    @PostMapping("user/delete")
    public ResponseEntity<String> contactdelete(@RequestBody Map<String, Object> payload) {
        System.out.println("Received ID: " + payload.get("id"));

        // Example: delete logic here using payload.get("id")
        // Long id = Long.parseLong(payload.get("id").toString());
         contactService.deletecontact((String) payload.get("id"));

        return ResponseEntity.ok().body("Contact deleted successfully");
    }

    @PostMapping("user/update")
    public ResponseEntity<Contact> contactupdate(@RequestBody Contact contact) {


        Contact contact1=contactService.getById(contact.getId());
        contact.setUser(contact1.getUser());
        contact.setDescritpion(contact1.getDescritpion());
        System.out.println("updated"+contact.getUser());

        contactService.saveContact(contact);









        return ResponseEntity.ok().body(contact);
    }

    @PostMapping("user/favourate")
    public ResponseEntity<?> toggleFavourite(@RequestBody Contact contact) {
        Contact existingContact = contactService.getById(contact.getId());
        if (existingContact == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Contact not found");
        }
        existingContact.setFavorate(contact.getFavorate());
        contactService.saveContact(existingContact);
        return ResponseEntity.ok("Favourite status updated to: " + existingContact.getFavorate());
    }

    @PostMapping("/sendotp")
    public ResponseEntity<String> sendotp(@RequestBody Map<String, String> body) throws MessagingException {

        System.out.println(body.get("useremail"));
        Random random=new Random();
      int otp = 1000 + random.nextInt(9000);
       System.out.println(otp+"otp");

       String subject="Otp From SCM";
       String message="<h1>Otp ="+otp+"</h1>";
       String to=body.get("useremail");


      boolean flag= this.emailService.sendEmail(subject,message,to);
      if(flag){
          return ResponseEntity.ok().body("Send Succesfully");
      }else{
          return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

      }


    }





    @GetMapping("/user/getfavorate")
    public ResponseEntity<List<Contact>> getfavourate(){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        System.out.println("Authenticated email: " + email);

        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));




        List<Contact> contactList=contactService.getallfav(user);

        return ResponseEntity.ok().body(contactList);




    }






}
