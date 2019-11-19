import mongoose from 'mongoose';

const enrollSchema =  new mongoose.Schema({
    fullName: { type: String, lowercase: true, min: 5, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phoneNumber: { type: String, required: true },
    courseName: { type: String, required: true },
    amount: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});



const Enroll = mongoose.model('Enrollments', enrollSchema);

export default Enroll;
