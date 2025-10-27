package com.scm.Services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileuploaadService {


    String uploadimage(MultipartFile picture) throws IOException;
    String geturlfrompublicId(String publicId);
}
