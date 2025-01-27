import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDb from "./config/dbConfig.js";
import User from "./schema/userSchema.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());



app.post('/hi', (req, res) => {
    console.log(req.body); // Corrected from res.body to req.body
    console.log('Received a POST request');
    res.send('POST request received');
})
app.listen(PORT, async() => {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
    // const newUser = await User.create({
    //     firstName: 'John ADoe',
    //     lastName: 'DoeA the name',
    //     email: 'john.1doe@example.com',
    //     password: 'password11',
    //     mobileNumber: '9926587697'
    // })
    // console.log('created new user');
    // console.log(newUser);
});