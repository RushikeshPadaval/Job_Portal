import app from "./app.js";
import cloudinary from "cloudinary";
import fileUpload from "express-fileupload";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
app.use(
  fileUpload({
    useTempFiles: true, // ✅ Required for Cloudinary
    tempFileDir: "/tmp/",
  })
);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});
