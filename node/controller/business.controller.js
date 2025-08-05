import businessModel from "../model/business.model";
import multer from "multer";
import fs from "fs";
import path from "path";


const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    if (!fs.existsSync("./business")) {
      fs.mkdirSync("./business");
    }
    cb(null, "./business");
  },
  filename: function (req,file, cb) {
    const orgName = file.originalname;
    const name = path.parse(orgName).name;
    const ext = path.parse(orgName).ext;
    const unique = Date.now();

    cb(null, name + "-" + unique + ext);
  },
});

const upload = multer({ storage: storage });

export const addBusinness = async (req, res) => {
  try {
    const addFile = upload.fields([
      { name: "images", maxCount: 100 },
      { name: "menu", maxCount: 100 },
      { name: "profileImg", maxCount: 1 },
    ]);

    addFile(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const profileImg = req.files?.["profileImg"]
        ? req.files["profileImg"][0].filename
        : null;
      let imagesArr = req.files?.["images"]
        ? req.files["images"].map((el) => el.filename)
        : [];
      let menuArr = req.files?.["menu"]
        ? req.files["menu"].map((el) => el.filename)
        : [];


      const {
        name,
        category,
        sub_category,
        street,
        city,
        state,
        ownedby,
        zip,
        email,
        website,
        compAdd,stream,
        phone,
        workingDays,
        description,
        noofemployee,
        turnover,
       whatsapp,
        board,
        typeofschool,
      
        costfortwo,
        facilities,
        knownfor,
      yearofestablishment,
        longitude,
        latitude,
        ratings,
        average,
        
        count,
        opensAt,
        closesAt,
        contactPerson
   
      } = req.body;

      let location = {};

      if (latitude && longitude) {
        location = {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        };
      }

      // const findBusiness = await businessModel.findOne({ 'contact.phone': phone })
      // console.log(findBusiness)

      if (req.body.sub_category === "") {
        req.body.sub_category = null;
      } 

      const safeJsonParse = (val) => {
  try {
    if (val && typeof val === 'string' && val.trim() !== '') {
      return JSON.parse(val);
    }
  } catch (err) {
    console.error(`Failed to parse JSON: ${val}`, err.message);
  }
  return [];
};

  

      const business = await businessModel.create({
        name: name,
        stream:safeJsonParse(stream || stream),
        category: category,
        sub_category: safeJsonParse(sub_category) || sub_category,
        description: description,
        ratings: ratings,
        noofemployee:noofemployee,
        turnover:turnover,
        board:  safeJsonParse(board) || board ,
        typeofschool: safeJsonParse(typeofschool) || typeofschool ,
        costfortwo: costfortwo,
        ownedby:safeJsonParse(ownedby) || ownedby ,
        facilities:  safeJsonParse(facilities) || facilities ,
        knownfor: safeJsonParse(knownfor) || knownfor,
      yearofestablishment:yearofestablishment,

        workingDays: safeJsonParse(workingDays) || workingDays   ,
        images: imagesArr,
        menu: menuArr,
        profileImg: profileImg,
        address: {compAdd, street, city, state, zip },
        contact: { phone, email, website,contactPerson,whatsapp },
        average: average,
        count: count,
       
        businessHours:{opensAt, closesAt},
        ...(latitude && longitude && {location}),
      });

      return res.status(200).json({
        data: business,
        message: "Business Data Added successfully",
        succes: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wromg",
      success: false,
    });
  }
};






export const getBusiness = async (req, res) => {
  try {
    const {
      cat_name,
      sub_cat,
      address,
      name,
      price,
      typeofschool,
      ownedby,
      openNow,
      verified,
    } = req.query;

    const filter = {};

    // Direct MongoDB fields
    if (address) {
      filter['address.compAdd'] = { $regex: address, $options: 'i' };
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' };
    }

   if (price) {
  filter.costfortwo = { $gte: Number(price) };
}


    if (typeofschool) {
      filter.typeofschool = { $in: [typeofschool] };
    }

    if (ownedby) {
      filter.ownedby = { $in: [ownedby] };
    }

    if (verified !== undefined) {
      filter.isVerified = verified === 'true';
    }


   





    // Initial find
    let businesses = await businessModel
      .find(filter)
      .populate('category')
      .populate('sub_category');

    // Apply category filter (after populate)
    if (cat_name) {
      businesses = businesses.filter(
        (biz) =>
          biz.category?.cat_name?.trim().toLowerCase() ===
          cat_name.trim().toLowerCase()
      );
    }

    // Apply subcategory filter (after populate)
    if (sub_cat) {
      businesses = businesses.filter(
        (biz) =>
          Array.isArray(biz.sub_category) &&
          biz.sub_category.some(
            (sub) =>
              sub?.sub_category?.trim().toLowerCase() ===
              sub_cat.trim().toLowerCase()
          )
      );
    }

    return res.status(200).json({
      data: businesses,
      message: 'Business data fetched successfully with filters',
      success: true,
    });
  } catch (error) {
    console.error('Filter error:', error);
    return res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
    });
  }
};


export const similarBusiness = async (req, res) => {
  try {
    const { sub_cat } = req.params;
    
   
       const business = await businessModel.find({
      sub_category: { $in: [sub_cat] }
    })

      return res.status(200).json({
        data: business,
        message: "Similar data fetched successfully",
        success: true,
      });
     
     
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  } 
}





export const getBusinessFilter = async (req, res) => {
  try {
    const { cat_name, address, phone, name } = req.query;
    const rgx = (x) => new RegExp(`.*${x}.*`, 'i');

    if (cat_name && address && name) {
      const business = await businessModel.find({
        $and: [{
          "address.compAdd": { $regex: address, $options: "i" },
        }, {
          "name": { $regex: name, $options: "i" },
        }]
      }).populate('category')
        .then(categories =>
          categories.filter(sub => sub.category.cat_name === cat_name.trim()));
     
  
    
      return res.status(200).json({
        data: business,
        message: "Business Data Fetched successfully",
        succes: true,
      });
    }

     else if (name) {
      const business = await businessModel.find({ "name": { $regex: rgx(name) } }).populate('category')
      return res.status(200).json({
        data: business,
        message: "Business Data Fetched successfully by business name",
        succes: true,
      })
    }
      
    else if(address){
      const business = await businessModel.find({ "address.compAdd": { $regex: rgx(address) } }).populate('category')
      return res.status(200).json({
        data: business.data.address.compAdd,
        message: "Business Data Fetched successfully by address",
        succes: true,
      })    
    }


    
    else if (phone) {
      const business = await businessModel.find({ "contact.phone": { $regex: rgx(phone) } }).populate('category')
      return res.status(200).json({
        data: business,
        message: "Business Data Fetched successfully by phone number",
        succes: true,
      })
    }


        
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};




export const getAllBusiness = async (req, res) => {
  try {
    const business = await businessModel.find().populate('category').populate('sub_category');

    return res.status(200).json({
      data: business,
      message: "Business Data Fetched successfully",
      succes: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wromg",
      success: false,
    });
  }
}

export const getBusinessById = async (req, res) => {
  try {
    const { id } = req.params;

    const business = await businessModel.findById(id).populate('category').populate('sub_category');

    return res.status(200).json({
      data: business,
      message: "Business Data Fetched successfully",
      succes: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wromg",
      success: false,
    });
  }
};

export const updateBusiness = async (req, res) => {
  try {
    const MultipleFile = upload.fields([
      { name: "images", maxCount: 1000 },
      { name: "profileImg", maxCount: 1 },
      { name: "menu", maxCount: 1000 },
    ]);

    MultipleFile(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const { id } = req.params;
      const existingData = await businessModel.findOne({ _id: id });



      // Fields from body
      const {
        name,
        category,
        sub_category,
        street,
        city,
        state,
        zip,
        contactPerson,
        ownedby,
        email,
        website,
        compAdd,
        noofemployee,
        turnover,
        whatsapp,
        board,
        typeofschool,
        costfortwo,
        facilities,
        knownfor,
        yearofestablishment,
        phone,
        stream,
        description,
        longitude,
        latitude,
        ratings,
        workingDays,
        average,
        count,
        opensAt,
        closesAt,
        deleteImages = "[]",
        deleteMenus = "[]",
      } = req.body;

            // Uploaded files
      const uploadedImages = req.files?.images?.map((file) => file.filename) || [];
      const uploadedMenu = req.files?.menu?.map((file) => file.filename) || [];
      const uploadedProfileImg = req.files?.profileImg?.[0]?.filename;

      // ✅ Parse delete arrays from string
      const deleteImagesArray = JSON.parse(deleteImages || "[]");
      const deleteMenusArray = JSON.parse(deleteMenus || "[]");

      // ✅ Remove deleted media from existing arrays
      const updatedImages = (existingData.images || []).filter(
        (img) => !deleteImagesArray.includes(img)
      );
      const updatedMenu = (existingData.menu || []).filter(
        (doc) => !deleteMenusArray.includes(doc)
      );

      // ✅ Combine remaining + new uploads
      const finalImages = [...updatedImages, ...uploadedImages];
      const finalMenu = [...updatedMenu, ...uploadedMenu];

      // ✅ Delete physical files from disk
      deleteImagesArray.forEach((filename) => {
        const filePath = path.join("business", filename);
        console.log(filePath)
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      deleteMenusArray.forEach((filename) => {
        const filePath = path.join("business", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });

      // ✅ Construct update object
      const updateFields = {
        name: name ?? existingData.name,
        category: category ?? existingData.category,
        sub_category: sub_category ?? existingData.sub_category,
        description: description ?? existingData.description,
        ratings: ratings ?? existingData.ratings,
        average: average ?? existingData.average,
        count: count ?? existingData.count,
        stream: stream ?? existingData.stream,
        ownedby: ownedby ?? existingData.ownedby,
        workingDays: workingDays ?? existingData.workingDays,
        businessHours: {
          opensAt: opensAt ?? existingData.businessHours?.opensAt,
          closesAt: closesAt ?? existingData.businessHours?.closesAt,
        },
        address: {
          compAdd: compAdd ?? existingData.address?.compAdd,
          street: street ?? existingData.address?.street,
          city: city ?? existingData.address?.city,
          state: state ?? existingData.address?.state,
          zip: zip ?? existingData.address?.zip,
        },
        contact: {
          phone: phone ?? existingData.contact?.phone,
          email: email ?? existingData.contact?.email,
          website: website ?? existingData.contact?.website,
          contactPerson: contactPerson ?? existingData.contact?.contactPerson,
          whatsapp: whatsapp ?? existingData.contact?.whatsapp,
        },
        noofemployee: noofemployee ?? existingData.noofemployee,
        turnover: turnover ?? existingData.turnover,
        costfortwo: costfortwo ?? existingData.costfortwo,
        facilities: facilities ?? existingData.facilities,
        knownfor: knownfor ?? existingData.knownfor,
        yearofestablishment: yearofestablishment ?? existingData.yearofestablishment,
        board: board ?? existingData.board,
        typeofschool: typeofschool ?? existingData.typeofschool,
        images: finalImages,
        menu: finalMenu,
        profileImg: uploadedProfileImg ?? existingData.profileImg,
      };

      if (latitude && longitude) {
        updateFields.location = { latitude, longitude };
      }

      const result = await businessModel.updateOne(
        { _id: id },
        { $set: updateFields }
      );

      if (result.modifiedCount > 0) {
        return res.status(200).json({
          data: result,
          message: "Business Data Updated Successfully !!",
          success: true,
        });
      } else {
        return res.status(200).json({
          message: "No changes detected.",
          success: false,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};

export const deleteBusiness = async (req, res) => {
  try {
    const id = req.params.id;
    // const imageQuery = req.query.imageQuery
    const deleteBusiness = await businessModel.findOne({ _id: id });

    if (!deleteBusiness) {
      return res.status(400).json({message:"Business Not found."})
    }

    

    const imgdata = await businessModel.deleteOne({
      _id: id,
    });
    if (imgdata.deletedCount > 0) {
      if (fs.existsSync(`./business/${deleteBusiness.profileImg}`)) {
        fs.unlinkSync(`./business/${deleteBusiness.profileImg}`);
      }
      deleteBusiness.images.map((e) => {
        if (fs.existsSync(`./business/${e}`)) {
        fs.unlinkSync(`./business/${e}`)
      }
      })
      
      deleteBusiness.menu.map((e) => {
        if (fs.existsSync(`./business/${e}`)) {
        fs.unlinkSync(`./business/${e}`)
      }
    })
      res.status(200).json({
        message: "Business deleted successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
