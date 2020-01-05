import mongoose from 'mongoose';

const assignmentSchema =  new mongoose.Schema({
    title: { type: String, lowercase: true, required: true },
    description: { type: String, required: true, min: 5, lowercase: true },
    course: { type: String, required: true },
    instructorName: { type: String },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' }
});


const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
