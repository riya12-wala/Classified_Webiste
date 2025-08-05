import mongoose from "mongoose";
const Schema = mongoose.Schema;
import {Category,SubCategory} from './categoryfinal.model' 

const businessSchema = new Schema({
    
        // ownerId: ObjectId,         // Reference to User Collection
    name: {
        type: String,
        // required:true
        },
    category: {
      type: Schema.Types.ObjectId,
      ref:Category,
        // required:true
        },      
  sub_category: {
    type: [Schema.Types.ObjectId],
    ref: SubCategory,
    default:[]
        },       // Optional subcategory
  address: { 
    compAdd:String,
    street: String,
    city: String,
    state: String,
    zip: String,
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
  ownedby: {
    type: Array,
    default:[]
          },
        contact: {
            phone: {
            type: [String],
                required: true, 
            },
            whatsapp: {
              type: String,
                 default:null
              },
            email: {
              type: String,
              default:null
            },
            website: {
                type: String,
                default:null
          },
          otp: {
            type: Number,
            default:null
            },
          contactPerson: {
            type: String,
            default:null
            },
        },
        description: String,
  images: {
    type: Array,
    default: []
  },
  // Array of image URLs
  profileImg: {
    type: String,
    default:null 
  },
   stream: {
    type: Array,
    default:[] 
  },
        ratings: {
          average: Number,         // Average rating
          count: Number            // Number of reviews
  },
  menu: {
    type: Array,
    default:[]
  },
      
        isVerified: Boolean,       // Verified by Admin
  isOpen:Boolean,
 
  businessHours: {
    opensAt: {
      type: String,
      default:null
    },
     closesAt: {
      type: String,
      default:null
    },
   
    
  },
  workingDays: {
    type: Array,
    default:[]
  },


  noofemployee: {
    type: String,
    default:''
  },
  turnover: {
    type: String,
    default:null
  },
  costfortwo: {
    type: Number,
    default:null
  },
  facilities: {
    type: Array,
    default:[]
  },
  knownfor: {
    type:Array,
    default:[]
  },
  yearofestablishment: {
    type: String,
    default:null
  },
  standardFees: {
    type: [
      {
        standard: {
          type: String,
          required: true
        },
        fee: {
          type: Number,
          required: true
        }
      }
    ],

  },
  board: {
    type: Array,
    default:[]
  },
  typeofschool: {
    type: Array,
    default:[]
  },

  
  createdAt: {
    type: Date,
    default:Date.now()
        },
        // updatedAt: Date
      })

export default mongoose.model('newbusi',businessSchema)