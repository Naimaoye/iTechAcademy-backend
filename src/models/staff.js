import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const staffSchema =  new mongoose.Schema({
    fullName: { type: String, lowercase: true, required: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    course: [{ type: String }],
    dateAdded: { type: Date, default: Date.now }
});

staffSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('password')) return next();
    console.log(user.isModified);
    bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    })
  });
  });


const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
