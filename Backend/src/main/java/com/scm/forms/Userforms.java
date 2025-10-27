package com.scm.forms;


import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Userforms {

    @NotBlank(message = "username is Required")
    private  String name;
    private String email;
    private String password;
    private String about;


}
