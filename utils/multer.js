const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./images');//this makes in root and not in this folder
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + file.originalname);
    }
});

const fileFilter = (req,file,cb) =>{
    if(file.mimetype ===  'image/jpeg' ||file.mimetype ==='image/jpg' || file.mimetype === 'image/png'){ //image types that will be accepted
        cb(null,true);
    }else{
        cb(null,false)//i can throw error instead of null
    }
}

const upload = multer({
    storage,
    limits: {fileSize: 1024 * 1024 * 10},//remove if no limit on fileSize, this expression is equal to 10 bytes
    fileFilter
});

module.exports = {upload};

