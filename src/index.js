import express from "express";
import { PORT } from "./config/serverConfig.js";
import connectDb from "./config/dbConfig.js";
import User from "./schema/userSchema.js";
import apiRoutes from './routes/apiRoutes.js'
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.text());

app.use('/api', apiRoutes);

app.all('*', (req, res) => {
    res.status(404).send('Page Not Found');
})
app.listen(PORT, async() => {
    await connectDb();
    console.log(`Server is running on port ${PORT}`);
    // const newUser = await User.create({
    //     firstName: 'John ADoe',
    //     lastName: 'DoeA the name',
    //     email: 'john.11doe@example.com',
    //     password: 'password11',
    //     mobileNumber: '9926587667'
    // })
    // console.log('created new user');
    // console.log(newUser);
});