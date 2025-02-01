import User from "../schema/userSchema.js";

// class userRepository {

async function findUser(parameters) {
    try {
        const responce = await User.findOne({...parameters });
        return responce;

    } catch (error) {
        console.log(error);
    }
}

async function createUser(userDetails) {
    try {
        const newUser = await User.create(userDetails);
        return newUser;
    } catch (error) {
        console.log(error);
    }
}
//}

//export default userRepository;

export {
    findUser,
    createUser,
}