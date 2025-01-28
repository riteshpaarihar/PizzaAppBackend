import User from "../schema/userSchema.js";

class userRepository {

    async findUser(parameters) {
        try {
            const responce = await User.findOne({...parameters });
            return responce;
        } catch (error) {
            console.log(error);
        }
    }

    async createUser(userDetails) {
        try {
            const newUser = await User.create(userDetails);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    }
}

export default userRepository;