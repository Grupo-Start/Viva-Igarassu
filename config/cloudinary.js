import { v2 as cloudinaryLib } from 'cloudinary';
import stream from 'stream';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

let cloudinary = cloudinaryLib;

if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
  });
} else {
  console.warn('[cloudinary] Credenciais ausentes; Cloudinary desabilitado (fallback de testes).');
  cloudinary = {
    uploader: {
      upload: () => Promise.reject(new Error('Cloudinary não configurado')),
      upload_stream: (cb) => {
        const pass = new stream.PassThrough();
        process.nextTick(() => {
          if (typeof cb === 'function') cb(new Error('Cloudinary não configurado'));
        });
        return pass;
      },
      destroy: () => Promise.reject(new Error('Cloudinary não configurado'))
    },
    config: () => {}
  };
}

export default cloudinary;
