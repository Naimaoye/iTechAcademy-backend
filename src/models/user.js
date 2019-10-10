import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    termOfUse: { type: Boolean, required: true },
    createdAt: type = Date,
});

module.exports = mongoose.model('User', userSchema);