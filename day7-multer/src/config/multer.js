const multer = require("multer");

const storageFromLocal = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const storageFromCloud = multer.memoryStorage()

const upload = multer({ storage: storageFromCloud });
module.exports = upload;
