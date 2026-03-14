import {User } from "../models.model.js" 
import { ApiError, catchAsync } from "../middleware/error.middleware";
import { genarateToken } from "../utils/generateToken.js";

export const createUserAccount = catchAsync(async(req,res) => {
    const{name, email,password, role='student'} = req.body


    // we will do validations globaly 
  const existingUser =User.findOne({email:email.toLowerCase()})

  if(existingUser){
    throw new ApiError('User already exists', 400);

  }

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
    role
  });
  await user.updateLastActive();
 genarateToken(res,user , 'Account created Succefully ')

});

export const authenticateUser = catchAsync(async(req, res) => {
    const {email, password} = req.body

     const user =User.findOne({email:toLowerCase()}).select('+password')
     if(!user || !(await user.comparePassword(password))){
        throw new ApiError("Invalid email or password", 401);

     }
    
     await user.updateLastActive()
     genarateToken(res, user, `Welcome back ${user.name}`);


});

export const signOutUser = catchAsync(async(req, res ) => {
        res.cookie('token', '',{maxAge: 0})
        res.status(200).json({
            success: true,
            message: "Signed out succesfully "
        })

});

export const getCurrentUserProfile = cathchAsync(async(req, res)=> {
    const user =   User.findById(req.id)
      .populate({
                 path: 'enrolledCourses.course',
                 select:'title thumbnail description '
      });
      if(!user){
        throw new  ApiError(" User not found", 404);
      }
      res.status(200).json({
        success:true,
        data:{
            ...user.toJSON(),
            totalEnrolledCourse: user.totalEnrolledCourse,
        },
      });
});


export const updateUserProfile = cathchAsync(async(req, res)=> {
      const {name, email, bio} = req.body;
      const upadateData={ 
        name , email: email?.toLowerCase(),
       bio};

 if (req.file){
   const avatarResult =await uploadMedia(req.file.path)
   upadateData.avatar = avatarResult.secure_url

   // delete old avatar 
      const user =await User.findById(req.id)
      
      if(user.avatar && user.avatar !== 'default-avatar.png') {
        await deleteMediaFromCloudniary(user.avatar)

      }
 }
     // update  User and get updated doc 

       const UpdatedUser = await  User.findByIdAndUpdate(
         req.id,
         upadateData,
         { new: true, runValidators: true}
      )
     if(!UpdatedUser) {
      throw new ApiError(" User not found", 404) ;

     }
    res.status(200).json({
      success: true,
      message: " profile updated succesfully ",
      data: UpdatedUser
    });

});




export const test = cathchAsync(async(req, res)=> {});


