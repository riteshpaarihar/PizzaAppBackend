import { findUser } from "../repository/userRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET } from "../config/serverConfig.js";


async function loginUser(authDetails) {
    const email = authDetails.email;
    const PlanePassword = authDetails.password;

    //const user = await findUser({ email });
    // console.log("Received password:", PlanePassword);
    const user = await findUser({ email });
    // console.log("User found:", user);

    if (!user) {
        throw { message: "User not found", statusCode: 404 };
    }


    const isMatch = await bcrypt.compare(PlanePassword, user.password);
    if (!isMatch) {
        throw { message: "Incorrect Password", statusCode: 401 };
    }

    const userRole = user.role ? user.role : "USER";

    const token = jwt.sign({ id: user._id, email: user.email, role: userRole }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return token;

}


export default loginUser;