package com.scm.Services.Implementation;

import com.scm.Entities.Contact;
import com.scm.Entities.User;
import com.scm.Repositories.ContactRepo;
import com.scm.Services.ContactService;
import com.scm.helpers.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ContactServiceimpl implements ContactService {

    @Autowired
    ContactRepo contactRepo;

    @Override
    public Contact saveContact(Contact contact) {
        return contactRepo.save(contact);
    }

    @Override
    public Contact update(Contact contact) {
        return null;
    }

    @Override
    public List<Contact> getAll() {
        return contactRepo.findAll();
    }

    @Override
    public Contact getById(String id) {
        return contactRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Contact Not found id "+id));
    }

    @Override
    public List<Contact> getallfav(User user) {
        return contactRepo.findByContactFavourate(user);
    }

    @Override
    public void deletecontact(String id) {
        Optional<Contact> optionalContact = contactRepo.findById(id);
        if (optionalContact.isPresent()) {
            Contact contact = optionalContact.get();

           contactRepo.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Contact not found with id " + id);
        }


    }

    @Override
    public List<Contact> getByUserId(String id) {




        return contactRepo.findByUserId(id);
    }
}
