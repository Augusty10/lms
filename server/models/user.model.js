import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { kMaxLength } from "buffer";

const  userScehma = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
        MaxLength: [50, 'Name Cannot Exceed 50 Charchter ' ] 
    },
    email: {
        type: String,
        required: [true, "E-mail is Required"],
        trim: true,
        unique: true,
        lowercase: true,
        match:[/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/],
    },
    password : {
        type: String,
        required: [true, "Password  is Required"],
        trim: true,
        minLength: [8, 'Password must be at least 8 characters long' ],
        select: false 
    },
    role: {
        type: String,
        enum: {
               values : ['student ', 'instructor', 'admin'],
                message: 'student select a valid role '
        },
        default: 'student'
    },
     avatar: {
        type: String,
        default: 'default-avatar.png'   
     },
     bio:{
         type: String,
         MaxLength: [200, 'Bio Cannot Exceed 200 Charchter '],  
     },
     enrolledCourses: [
        {
           course:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
           } ,
           enrolledAt: {
            type: Date,
            default: Date.now
           }
        }
     ], 
         createdCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
         }],
         resetPasswordToken: String,
            resetPasswordToken: Date,
            lastActive: {
                type: Date,
                default: Date.now
            }
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}

});

//  hasing  the password 
userScehma.pre('save', async function (next){

    if (!this.isModified('password')) {
        return next();

    }
 this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare the password 
userSchema.methods.comparePassword= async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

userSchema.methods.getResetPasswordToken = function (){
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto
           .createHash('sha256')
           .update(resetToken)
           .digest('hex')
            this.resetPasswordExpire = Date.now()+10*60*1000  //10 minutes 
            return resetToken 
}

userScehma.methods.updateLastActive= function(){
    this.lastActive = Date.now()
    return this.lastActive({validateBeforeSave:false})
}


// Virtual Field for Enrolled Courses 
userSchema.virtual('totalEnrolledCourses').get(function(){
    return  this.enrolledCourses.length
})

export const User = mongoose.model('User', userScehma)