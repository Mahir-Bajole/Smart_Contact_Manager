package com.scm.Services.Implementation;


import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.scm.Services.FileuploaadService;
import com.scm.helpers.AppContants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class ImageServiceImpl implements FileuploaadService {

    @Autowired
    Cloudinary cloudinary;

    @Override
    public String geturlfrompublicId(String publicId) {
        return cloudinary.url().transformation(
                new Transformation().width(AppContants.CONTACT_IMAGE_WIDTH).height(AppContants.CONTACT_IMAGE_HEIGHT).crop(AppContants.CONTACT_IMAGE_CROP)
        ).generate(publicId);
    }

    @Override
    public String uploadimage(MultipartFile picture) throws IOException {
        String filename= UUID.randomUUID().toString();

        try {
            byte[] data= new byte[picture.getInputStream().available()];
            picture.getInputStream().read(data);
            cloudinary.uploader().upload(data, ObjectUtils.asMap(
                    "public_id",filename

            ));
            return this.geturlfrompublicId(filename);
        } catch (IOException e) {
           e.printStackTrace();
            return null;
        }



    }
}
