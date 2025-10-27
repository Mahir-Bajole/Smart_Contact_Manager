package com.scm.forms;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Userlogin {
    private String email;
    private String password;
}
