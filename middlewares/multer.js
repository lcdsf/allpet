const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve('public/img'));
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + 'allpet' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;