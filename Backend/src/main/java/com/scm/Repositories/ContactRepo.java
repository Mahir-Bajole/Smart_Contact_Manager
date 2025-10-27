package com.scm.Repositories;

import com.scm.Entities.Contact;
import com.scm.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ContactRepo extends JpaRepository<Contact,String> {


    //find contact by user
    List<Contact> findByUser(User user);

    @Query("SELECT  c from  Contact  c where  c.user.id=:userid")
    List<Contact> findByUserId(@Param("userid") String userid);

    @Query("SELECT c FROM Contact c WHERE c.favorate = true AND c.user = :user")
    List<Contact> findByContactFavourate(@Param("user") User user);




}
