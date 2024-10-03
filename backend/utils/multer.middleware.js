//multer

import multer from 'multer';
import path from 'path';

//set dirname
const __dirname = path.resolve();

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //path.rssolve uploads folder with dirname
        const path1=path.resolve(__dirname, 'uploads/');
        cb(null, path1);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

//export
export const upload = multer({
    storage: storage,
})