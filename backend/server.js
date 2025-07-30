import app from "./app.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

// ✅ Configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// ✅ Add fileUpload middleware BEFORE listen
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ✅ Add route BEFORE listen
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ✅ Start server AFTER all routes/middleware are defined
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
