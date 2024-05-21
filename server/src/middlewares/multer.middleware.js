//i am using multer here to save file locally then i upload it in cloudnary server.
const multer = require("multer");

//multer storage used here is : diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); //path where the file save locally
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;

// export const upload = multer({
//   storage,
// });

/*---------the original code of multer---------*/

/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
*/
