import mongoose from 'mongoose';

const jobSchema =  new mongoose.Schema({
    title: { type: String, lowercase: true, min: 5, required: true },
    description: { type: String, required: true, min: 10, lowercase: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Companies' },
    companyName: {type:String},
    postedOn: { type: Date, default: Date.now }
});

const Jobs = mongoose.model('Jobs', jobSchema);

export default Jobs;
