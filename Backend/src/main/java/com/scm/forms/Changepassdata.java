package com.scm.forms;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Changepassdata {

    private  String confirmPassword;
    private  String currentPassword;
    private  String newPassword;


}
