import mongoose, { VirtualType }  from "mongoose";


const coursePurchaseSchema = new mongoose.Schema(
    {
   course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Course reference is required "]
   },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:" User ",
        required: [ true, " user interfecae is required "],
    },
    amount: {
        type: Number,
        required:[true, "Purcahse amount is required "],
        min: [0,"Smoun must be non-negative "],
    } ,
    currency: {
        type: String,
        required :  [true, " Currency is required " ],
        upparecase: true, 
        default: "USD",
    },

    status: {
        type: String,
        enum: {
            values: ["pending ", "completed ", " failed", "refunded"],
            message:[" Plese Select a valid status "],
        },
        default: "pending",
    },
      paymentMethod:{
        type: String,
        required: [true, "Payment method is required"],
      },
      paymentID: {
        type: String,
        required: [true, "Payment id is required "],
      },
     refundID: {
        type: String,
     },
     refundAmount: {
          type: Number,
          min: [0, " Refund amount must be non-negative"],
        },

       refundReason:{
        type: String,
       },
       metadata: {
        type: Map,
        of: String,
       },
    },
    { timestamps: true,
     toJSON: { Virtuals: true},
     toObject: {virtuals: true },

    }
    );

    coursePurchaseSchema.index ({user:1, course: 1}) 
    coursePurchaseSchema.index ({staus:1}) 
    coursePurchaseSchema.index ({createdAt: -1})

    coursePurchaseSchema.virtual('isRefundable').get(function(){
        if(this.status !=='completed') return false;
        const thirtyDaysAgo= new Date(Date.now()-30*24*60 *1000)
        return this.cretedAt > thirtyDaysAgo
    })


//  method to process refund 

coursePurchaseSchema.methods.processrefund = async function(reson, amount){
    this.status = " refunded";
    this.reason = reson ; 
    this.refundAmount = amount || this.amount  
    return this.save();

};

export const CoursePurchase = mongoose.model('CoursePurchase', 
    coursePurchaseSchema 
);


 