import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dcccdrzy6',
      api_key: '429232261193112',
      api_secret: '5aotAJfxj9AFMSPVhkeKim0jc2c',
    });
  }

  async uploadImage(fileBuffer: Buffer, folder: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
