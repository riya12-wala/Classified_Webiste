import mongoose from "mongoose";
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    cat_name: {
        type: String,
        required:true
    },
    Icon:
    {
        type: String,
        default:null
        }
})

const subcategorySchema = new Schema({
    cat_name: {
        type: Schema.Types.ObjectId,
        ref:"Category"
    },
    sub_category:{
    type: String,
        required:true
    },
    icons:
    {
        type: String,
        default:null
        }
})
const nestedcategorySchema = new Schema({
    cat_name: {
        type: Schema.Types.ObjectId,
        ref:"Category"
    },
    sub_category: {
        type: Schema.Types.ObjectId,
        ref:"SubCategory"
    },
    nested_category:{
    type: String,
        required:true
    },
    icons:
    {
        type: String,
        default:null
        }
})

const Category = mongoose.model('Category',categorySchema)
const SubCategory = mongoose.model('SubCategory',subcategorySchema)
const NestedCategory = mongoose.model('NestedCategory',nestedcategorySchema)
 

module.exports = {
    Category,
    SubCategory,
    NestedCategory
}