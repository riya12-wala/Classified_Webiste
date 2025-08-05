// import categoryModel from '../model/category.model'


// export const addCategory = async (req, res) => {
//     try {
//         const { cat_name, sub_categories
            
//         } = req.body;
        

        
//         const category = await categoryModel.create({
//             cat_name: cat_name,
//             sub_categories: sub_categories,
//         })
//         // console.log(category)
//         // console.log(category.cat_name)
//         // console.log(sub_categories[0].name)
//         // console.log(sub_categories[0].nested_categories[0].name)
//         return res.status(200).json({ data: category, message: "Category added successfully", success: true });

//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
        
//     }
// }
// export const getCategories = async (req, res) => { 
//     try {
        
//         const categories = await categoryModel.find();
//         return res.status(200).json({ data: categories, message: "Categories fetched successfully", success: true });

//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }

// export const getCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const category = await categoryModel.findById(id);
//         if (!category) {
//             return res.status(400).json({
//                 "message":"Category doesnt exist"
//             })
//         }
//         if(category) {
//             return res.status(200).json({
//                 success: true,
//                 data: category,
//                 type: "category"
//             });
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }


// export const getSubCategory = async (req, res) => {
//     try {
//         const { id, sub_id } = req.params;
//         const category = await categoryModel.findById(id);
//         if (!category) {
//             return res.status(400).json({ message: "Category doesn't exist", success: false });
//         }

//         // console.log(category.sub_categories[0]._id)

//         const subCategory = category.sub_categories.find(sub => sub._id.toString() === sub_id);
//         if (!subCategory) {
//             return res.status(400).json({ message: "Sub-category doesn't exist", success: false });
//         }

//         return res.status(200).json({ data: subCategory, message: "Sub-category fetched successfully", success: true });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }

// export const updateCategory = async (req, res) => {         
//     try {
//         const { id } = req.params;
//         const { cat_name,icons,sub_categories } = req.body;
//         const category = await categoryModel.findById(id);
//         if (!category) {
//             return res.status(404).json({ message: "Category not found" });
//         }
//         if (cat_name) {
//             category.cat_name = cat_name;
//         }
//         if (icons) {
//             category.icons = icons;
//         }   

//         if (sub_categories) {
//             category.sub_categories = sub_categories;
//         }

//         // if (nested_categories && Array.isArray(nested_categories)) {
//         //     nested_categories.forEach((newNested) => {
//         //         const existingNested = category.nested_categories.find((nested) => nested._id == newNested._id);
//         //         if (existingNested) {
//         //             existingNested.nested_categories = newNested.nested_categories || existingNested.nested_categories;
//         //         } else {
//         //             category.nested_categories.push(newNested);
//         //         }
//         //     })
//         // }

//         await category.save();

//         return res.status(200).json({ data: category, message: "Category updated successfully", success: true });   
//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }   
// }

// export const deleteCategory = async (req, res) => {             
//     try {
//         const { id } = req.params;
//         await categoryModel.findByIdAndDelete(id);
//         return res.status(200).json({ message: "Category deleted successfully", success: true });
//     } catch (error) {
//         return res.status(500).json({ message: error.message, success: false });
//     }
// }