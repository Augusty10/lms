import mongoose  from "mongoose";

const courseSchena = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is Required '],
        trim: true,
        maxLength: [100, 'Course  cannot exceed 100 charcheters' ]
    },
    
     subtitle: {
        type: String,
        trim: true,
        maxLength: [100, 'Course  cannot exceed 100 charcheters' ]
    },
     description: {
        type: String,
        trim: true,
    },
    category:{
        type: String,
        required: [true, 'Course catogry is required '],
        trim: true
    },
    level: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'Plese Select a valid Course level '
        },
        defailt: 'beginner ' 
    },
    price:{
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Course price cannot be negative ']
    },
    thumbnail: {
        type: String,
        required: [true, 'Course thumbnail is required']  
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Lecture'
        }
    ],
    instructor: {
         type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        required: [true, 'Course instructor is required']
    }, 
    isPublished: {
        type: Boolean,
        default: false 
    },
    totalDuration: {
        type: Number,
        default: 0
    },
    totalLectures: {
        type: Number,
        default:0 
    }

},
{
  timestamps: true,
  toJSON: { virtuals: true},
  toObject: { virtuals: true},
}
);

courseSchena.virtual('avarageRating').get(function (){
    return 0; // Placeholder for average rating calculation ( Assighnment )
})

courseSchema.pre('save', function(next){
    if(this.lectures ) {
        this.totalLectures = this.lectures.length 
    }

     next ();

})

export const Course = mongoose.model( "Course", courseSchema);
