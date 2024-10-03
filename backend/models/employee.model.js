//create employee model

import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    mobileNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please provide a valid 10-digit mobile number']
    },
    designation: {
        type: String,
        enum: ['HR', 'Manager', 'Sales'],
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    courses: {
        type: String,
        enum: ['MCA', 'BCA', 'BSC'],
        required: true
    },
    imgUpload: {
        type: String, // This should be the file path or URL of the uploaded image
        required: true
    }
}, {
    timestamps: true
});

//export model

export const employee=mongoose.model('employee',employeeSchema)