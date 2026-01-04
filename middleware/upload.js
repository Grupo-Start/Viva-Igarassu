import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const fileFilter = (req, file, cb) => {
  const tiposPermitidos = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp"
  ];

  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas (jpeg, jpg, png, gif, webp)"));
  }
};

function createCloudinaryUpload(folder = "viva-igarassu/default") {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ["jpeg", "jpg", "png", "gif", "webp"],
      public_id: () => `upload-${Date.now()}-${Math.round(Math.random() * 1e9)}`
    }
  });

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  });
}

export const uploadRecompensaImagem = createCloudinaryUpload("viva-igarassu/recompensas").any();
export const uploadEventoImagem = createCloudinaryUpload("viva-igarassu/eventos").any();

export default {
  createCloudinaryUpload,
  uploadRecompensaImagem,
  uploadEventoImagem
};
