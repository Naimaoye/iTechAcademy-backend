import mongoose from 'mongoose';

const courseSchema =  new mongoose.Schema({
    courseName: { type: String, lowercase: true },
    courseCode: { type: String }
});

courseSchema.pre('save', function () {
    
});


const Courses = mongoose.model('Course', courseSchema);

export default Courses;
