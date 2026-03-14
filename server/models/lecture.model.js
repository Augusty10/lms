import mongoose from 'mongoose';

const lectureSchema = new mongoose.Schema({
      title: {
        type: String,
        required: [true, " Lecture is requeired "],
        trim: true,
        maxLength: [100, " Lecture title cannoot be exceed 500 charchter "],
      },
      description: {
          type: String,
          trim: true,
          maxLength: [500, "Lecture cannot exceed  500 Charchters "]
      },
    
        videoUrl: {
              type: String ,
            requierd: [true, ' Video URL is Required']  
        },
           duration: {
            type: Number,
            default: 0
               },
            publicID:{
              type: String,
              required: [true, 'Public ID is Required for video managment ']
            },
            isPreview: {
              type: Boolean,
              default: false 
            },
            order: {
              type: Number,
              requierd: [true, 'Lecture order us required ']
            }

},  {
      timestamps: true,
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true
      },
}

);

lectureSchema.pre('save', function(next){
  if(this.isPreview){
    this.duration=Math.round(this.duration*100)/100;
    // Optional thing 
  }
  next(
  );
});

export const Lecture = mongoose.model('Lecture', lectureSchema)
