import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    document: {
        type: String,
        required: true
    },
    fileType:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;