import userRepository from "../repository/userRepository.js";
import UserService from "../services/userSevice.js";

async function createUser(req, res) {
    console.log("Creating user...");
    console.log(req.body);

    const userService = new UserService(new userRepository());
    try {
        const responce = await userService.registerUser(req.body);

        return res.json({
            data: responce,
            message: "User created successfully!",
            success: true,
            //  statusCode: 201,
            error: {}
        })
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(error.statusCode).json({
            data: {},
            message: error.message,
            success: false,
            // statusCode: 500,
            error: error
        })
    }
    return res.json({
        message: "User created successfully!"
    })
}


export { createUser };