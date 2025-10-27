package com.scm.Services;

import com.scm.Entities.Contact;
import com.scm.Entities.User;

import java.util.List;
import java.util.Optional;

public interface ContactService {

    Contact saveContact(Contact contact);

    Contact update(Contact contact);

    List<Contact> getAll();


    Contact getById(String id);

    void deletecontact(String id);

    List<Contact> getByUserId(String id);

    List<Contact> getallfav(User user);





}
