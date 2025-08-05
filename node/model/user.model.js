import mongoose  from 'mongoose'
import businessModel from './business.model';
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
     pincode: String,
  city: String,
  street: String,
  state: String,
  tag: String,
  customTag: String,
    address: String,
 })

const friendSchema = new mongoose.Schema({
    fdob: Date,
    femail: String,
    firstname: String,
    fphone: Number,
    ftitle: String,
    lastname: String,
    relationship:String
})


const userSchema = new Schema({    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    status: {
        type: String 
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    ContactNo: {
        type: String,
        required:true
    },
    fname:{
        type: String,
        default: null,
    },
    mname:{
        type: String,
      default:null,
    },
    lname:{
        type: String,
        default:null,
    },
    role:{
        type: String,
        enum: ['user', 'business','admin'],
        default: 'user'
    },
    profilePic: {
        type: String,
        default:null
    },
    DOB: {
        type: Date,
        default:null
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default:'Point'
        },
        coordinates: {
            type: [Number],
            default: [0, 0] //[longitude,latitude]
        }
    },
    Occupation: {
        type: String,
        default:null
    },
   
    whatsapp: {
        type: Number,
        default:null
    },
    home1: {
        type: Number,
        default:null    
    },
    home2: {
        type: Number,
        default:null    
    },
    office: {
        type: Number,
        default:null    
    },

    addressArr: {
        type: [addressSchema],
        default:[]
    },
    friends: {
        type: [friendSchema],
        default:[]
    },
saved:{
    type: [Schema.Types.ObjectId],
    ref: businessModel,  //business id
    default:[]
    },
    // liked: {
    //     type: [Schema.Types.ObjectId],
    //     ref: businessModel, //business id
    //     default:[]
    // },
    // resetPasswordToken: {
    //     type: String,
    //     default: null
    // },
    // resetPasswordExpires: {
    //     type: Date,
    //     default: null
    // },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Users',userSchema)
