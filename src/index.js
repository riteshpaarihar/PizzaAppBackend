import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDb from "./config/dbConfig.js";
import User from "./schema/userSchema.js";
import apiRoutes from './routes/apiRoutes.js'
import cookieParser from 'cookie-parser';
import isLoggedIn from "./validations/authValidator.js";
import uploader from "./middleware/multerMiddleware.js";
import cloudinary from "./config/cloudinaryConfig.js";
import fs from "fs/promises";
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use('/api', apiRoutes);

app.post('/home', isLoggedIn, (req, res) => {
    // res.send('Welcome Home');
    res.json({
        message: 'Welcome Home',
        data: req.body
    });
})
app.post('/uploade', uploader.single('image'), async(req, res) => {
    console.log('File uploaded');
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result", result);

    await fs.unlink(req.file.path);
    res.json({
        message: 'ok',
        data: req.body
    });
})
app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
})
app.listen(PORT, async() => {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
});