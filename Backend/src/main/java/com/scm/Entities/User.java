package com.scm.Entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "Users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    private String UserId;
    @Column(name = "user_name",nullable = false)
    private  String name;

    @Column(unique = true,nullable = false)
    private String email;

    @Override
    public String getPassword() {
        return this.password;
    }

    @Getter(AccessLevel.NONE)
    private String password;
    @Column(length = 10000)
    private String about;

    @Column(length = 10000)
    private  String Profilepic;
    private  Boolean Isenabled=true;
    private Boolean EmailVerified=false;
    private Boolean PhoneVerified=false;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> rolelist=new ArrayList<>();



    //sign up with self google github

    @Enumerated(EnumType.STRING)
    private Providers provider=Providers.GOOGLE;
    private  String providerUserId;

    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY,orphanRemoval = true)
    private List<Contact> contactList=new ArrayList<>();


    @Override
    //use for role
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // user admin collection of simple authority roles {user , Admin} ek user ke pass multiple user hote hai
       Collection<SimpleGrantedAuthority>roles= rolelist.stream().map(role-> new SimpleGrantedAuthority(role)).collect(Collectors.toCollection(ArrayList::new));
        return roles;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.Isenabled;
    }
}
