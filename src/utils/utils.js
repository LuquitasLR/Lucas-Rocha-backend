import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

export const generateID =()=>{
  const a =Date.now().toString(30)
  const b =Math.random().toString(30).substring(2)
  return a+b
}