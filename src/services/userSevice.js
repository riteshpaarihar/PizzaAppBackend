class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async registerUser(userDetails) {
        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobailNumber: userDetails.mobailNumber
        });
        if (user) {
            const error = new Error('User with the given number and email already exists');
            error.statusCode = 400;
            throw error;
        }

        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,

        });
        if (!newUser) {
            throw {
                message: 'Failed to create user',
                statusCode: 500
            }
        }
        return newUser;
    }
}

export default UserService;