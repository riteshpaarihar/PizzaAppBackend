import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName  is required for creating"],
        minlength: [3, "firstName must be at least 3 characters long"],
        maxlength: [50, "firstName must be at most 50 characters long"],
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, "firstName  is required for creating"],
        minlength: [3, "firstName must be at least 3 characters long"],
        maxlength: [50, "firstName must be at most 50 characters long"],
        trim: true,
        lowercase: true,
    },
    mobileNumber: {
        type: String,
        required: [true, "mobileNumber is required for creating"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "email is required for creating"],
        trim: true,
        unique: [true, "email must be unique for creating"],
        match: [/\S+@\S+\.\S+/, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, "password is required for creating"],
        minlength: [10, "password must be at least 8 characters long"],
        maxlength: [10, "password must be at least 8 characters long"],
        // select: false, // Hide password in response
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    }
}, { timestamps: true });


userSchema.pre('save', async function(req, res) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    console.log(this);

})




const User = mongoose.model('User', userSchema);

export default User;