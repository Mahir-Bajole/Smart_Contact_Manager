package com.scm.Services;



import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


import java.util.Properties;

@Service
public class EmailService {
    @Value("${mail.username}")
    private String from;

    @Value("${mail.password}")
    private String password;








   public  Boolean  sendEmail(String subject,String message ,String to) throws MessagingException {

       boolean f=false;

       String host="smtp.gmail.com";



       //properties
      Properties properties= System.getProperties();

      properties.put("mail.smtp.host",host);
       properties.put("mail.smtp.port","465");
       properties.put("mail.smtp.ssl.enable","true");
       properties.put("mail.smtp.auth","true");



       //get session
       Session session=Session.getInstance(properties, new Authenticator() {
           @Override
           protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication(from,password);
           }
       });

       session.setDebug(true);


       //compose the message

       MimeMessage mimeMessage =new MimeMessage(session);
       //from
       mimeMessage.setFrom(from);
       mimeMessage.addRecipient(Message.RecipientType.TO,new InternetAddress(to));

       //adding subject to message

       mimeMessage.setSubject(subject);

       mimeMessage.setContent(message, "text/html; charset=utf-8");



       //send message


       Transport.send(mimeMessage);

f=true;





        return  f;



    }



}
