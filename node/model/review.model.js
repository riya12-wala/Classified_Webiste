import mongoose from "mongoose";
import businessModel from "./business.model.js";
import userModel from "./user.model.js";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    
    businessId: {
        type: Schema.Types.ObjectId,
        ref:businessModel,
       
    }, // Reference to Business Collection
    userId: {
        type:
            Schema.Types.ObjectId,
        ref:userModel,
        required:true
    }, // Reference to User Collection
    rating: {
        type: Number,
            default:0
        }, // 1 to 5 stars
    comment: {
        type: String,
            default:null
    },
    images: {
        type: Array,
        default:[]
    },
    createdAt: {
        type: Date,
            default:Date.now()
        }  
})

export default mongoose.model('review',reviewSchema)