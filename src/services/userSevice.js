import { createUser, findUser } from "../repository/userRepository.js";

async function registerUser(userDetails) {
    // console.log("Received user details:", userDetails);
    // const user = await findUser({
    //     email: userDetails.email,
    //     mobileNumber: userDetails.mobileNumber
    // });

    // if (user) {
    //     const error = new Error('User with the given number and email already exists');
    //     error.statusCode = 400;
    //     throw error;
    // }


    const existingUserByEmail = await findUser({ email: userDetails.email });
    const existingUserByMobile = await findUser({ mobileNumber: userDetails.mobileNumber });

    if (existingUserByEmail && existingUserByMobile) {
        const error = new Error('User with the given email and mobile number already exists');
        error.statusCode = 400;
        throw error;
    } else if (existingUserByEmail) {
        const error = new Error('User with the given email already exists');
        error.statusCode = 400;
        throw error;
    } else if (existingUserByMobile) {
        const error = new Error('User with the given mobile number already exists');
        error.statusCode = 400;
        throw error;
    }
    const newUser = await createUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName
    });

    if (!newUser) {
        const error = new Error('Failed to create user');
        error.statusCode = 500;
        throw error;
    }

    return newUser;
}

export default registerUser;