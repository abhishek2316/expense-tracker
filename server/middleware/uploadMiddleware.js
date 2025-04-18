const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
})

// file filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if(allowed.includes(file.mimetype)) {
        cb(null, true);
    }else{
        cb(new Error("Only .jpeg, .png and .jpg formats are allowed"), false);
    }
}




const upload = multer({ storage, fileFilter})

module.exports = upload;