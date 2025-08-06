import { Category, SubCategory, NestedCategory } from '../model/categoryfinal.model.js'
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    if (!fs.existsSync("./category")) {
      fs.mkdirSync("./category");
    }
    cb(null, "./category");
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const ext = path.extname(orgName);
    const name = path.parse(orgName).name;
    const unique = Date.now();
    cb(null, `${name}-${unique}${ext}`);
  },
});
const upload = multer({ storage: storage });




export const addCategory = async (req, res) => {
    try {


        const fileData = upload.single("Icon");
       fileData(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err.message, success: false });
            }
            const icons = req.file ? req.file.filename : null;
            
            const { cat_name } = req.body;
            
            const category = await Category.create({
                cat_name: cat_name,
               Icon: icons
            })
            
            return res.status(200).json({
                data: category,
                success: true,
                message:"Category Added Succsessfully"
            })
       })        
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went Wrong.",
            success:false
        })
    }
    
}


export const addSubCategory = async (req, res) => {
    try {
        const { cat_name,sub_category,icons } = req.body;

        const category = await SubCategory.create({
            cat_name: cat_name,
            sub_category: sub_category,
            icons:icons
        })

        return res.status(200).json({
            data: category,
            success: true,
            message:"Sub Category Added Succsessfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went Wrong.",
            success:false
        })
    }
    
}

export const addNestedCategory = async (req, res) => {
    try {
        const { sub_category, nested_category, cat_name ,icons} = req.body;

        const category = await NestedCategory.create({
            cat_name:cat_name,
            nested_category:nested_category,
            sub_category: sub_category,
            icons:icons
        })

        return res.status(200).json({
            data: category,
            success: true,
            message:"Nested Category Added Succsessfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Something went Wrong.",
            success:false
        })
    }
    
}


export const getCategories = async (req, res) => {
    const { id } = req.params;
    
try 
{
    
        const category = await Category.find();
        
        return res.status(200).json({
            data: category,
            success: true,
            message:"Category fetched Succsessfully"
        })
     
}
catch (error) {
    return res.status(500).json({
        message: "Something went Wrong.",
        success:false
    })
}

}


export const subCategoriesAll = async (req, res) => {
    try {
        const category = await SubCategory.find()
        return res.status(200).json({
            data: category,
            filepath: process.env.FILEPATH,
            message: " fetched successfully",
            success: true,
          });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success:false
        })
    }
}

export const getSubCategories = async (req, res) => {
    const { id } = req.params
    const { cat_name } = req.query;
    try 
    {
       
        if (id) {
            const category = await SubCategory.findById({ _id: id })
            return res.status(200).json({
                data: category,
                filepath: "https://classified-webiste.onrender.com/node-files",
                message: " fetched successfully",
                success: true,
              });
        }
        else {
        const category = await SubCategory.find().populate('cat_name').then(subcategories => 
            subcategories.filter(sub => sub.cat_name.cat_name === cat_name.trim())
        )        
        return res.status(200).json({
            data: category,
            success: true,
            message:"Sub Category fetched Succsessfully"
        })
        }
    }     
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success:false
        })
    }   
}
    
export const getNestedCategories = async (req, res) => {
    try 
    {
        const category = await NestedCategory.find().populate('cat_name').populate('sub_category');
        
        return res.status(200).json({
            data: category,
            success: true,
             message:"Nested Category fetched Succsessfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
            success:false
        })
    }
}
    

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log("running")
        
        const delete1 = await Category.deleteOne({_id: id});

        console.log(delete1);
        
        if (delete1.deletedCount > 0) {
            return res.status(200).json({ message:" Delete successfully"  })
            }
    } catch (error) {
        return res.status(500).json({ message:"Something Went Wrong"})
    }
}

export const deleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        console.log("running")
        
        const delete1 = await SubCategory.deleteOne({_id: id});

        console.log(delete1);
        
        if (delete1.deletedCount > 0) {
            return res.status(200).json({ message:" Delete successfully"  })
            }
    } catch (error) {
        return res.status(500).json({ message:"Something Went Wrong"})
    }
}



export const updateCategory = async (req, res) => {
    try {


        const updateFile = upload.single("Icon");

        updateFile(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ message: err.message, success: false });
            }
            const { id } = req.params;
           
            const { cat_name } = req.body;

            const imgData = await Category.findById(id);
            const icons = req.file ? req.file.filename : imgData.Icon;

            if (req.file) {
                 if (fs.existsSync(`./category/${imgData.Icon}`)) {
                          fs.unlinkSync(`./category/${imgData.Icon}`);
                        }
            }
            
            const category = await Category.findByIdAndUpdate(id, {
                cat_name: cat_name,
                Icon: icons
            }, { new: true })
            
            return res.status(200).json({
                data: category,
                success: true,
                message:"Category Updated Succsessfully"
            })
       })  
    } catch (error) {
        return res.status(500).json({ message:"Something Went Wrong"})
    }
}



