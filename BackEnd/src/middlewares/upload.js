// middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Renombra el archivo para evitar duplicados
    },
});

// Configuración del middleware
const upload = multer({ storage });

module.exports = upload;
