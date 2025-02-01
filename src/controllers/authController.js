import loginUser from "../services/authService.js";


async function login(req, res) {
    try {
        const payload = req.body;

        const responce = await loginUser(payload);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: responce,
            error: {}
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to login",
            data: {},
            error: error.message
        })
    }
}


export default login;