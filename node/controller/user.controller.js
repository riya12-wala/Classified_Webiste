import userModel from "../model/user.model.js";
import path from "path";
import fs from "fs";
import multer from "multer";
import bcrypt from "bcryptjs";
import businessModel from "../model/business.model.js";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "./uploads");
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

export const addUser = async (req, res) => {
  try {
    console.log(req.headers);
    const fileData = upload.single("profilePic");

    fileData(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message, success: false });
      }

      const profileimg = req.file ? req.file.filename : null;
      console.log(req.body);
      const {
        fname,
        lname,
        mname,
        name,
        email,
        DOB,
        password,
        Occupation,
        ContactNo,
        whatsapp,
        home1,
        home2,
        office,   
        latitude,
        longitude,
      } = req.body;

      let location = {};

      if (latitude && longitude) {
        location = {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        };
      }
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userData = await userModel.create({
        fname: fname,
        lname: lname,
        mname: mname,
        name: name,
        email: email,
        password: hashedPassword,
        DOB: DOB,
        Occupation: Occupation,
        ContactNo: ContactNo,
        whatsapp: whatsapp,
        home1: home1,
        home2: home2,
        address: address,
        pincode: pincode,
        profilePic: profileimg,
        ...(latitude && longitude && { location }),
      });
      res.status(201).json({
        data: userData,
        message: "User added successfully",
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getUser = async (req, res) => {
  try {
    const userData = await userModel.find();
    res.status(200).json({
      data: userData,
      filepath: "http://localhost:4001/uploads",
      message: "User fetched successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await userModel.findOne({ _id: id });
    res.status(200).json({
      data: userData,
      filepath: "http://localhost:4001/uploads",
      message: "User fetched successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateFile = upload.single("profilePic");
    updateFile(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: err.message, success: false });
      }

      const imgdata = await userModel.findOne({ _id: req.user._id });

      console.log(imgdata.fname)
      
         const profileimg = req.file ? req.file.filename : imgdata.profilePic;

      if (req.file) {
        if (fs.existsSync(`./uploads/${imgdata.profilePic}`)) {
          fs.unlinkSync(`./uploads/${imgdata.profilePic}`);
        }
      }

      // const id = req.params.id;
      const {
        fname,
        lname,
        mname,
        name,
        email,
        DOB,
        Occupation,
        ContactNo,
        whatsapp,
        home1,
        home2,
        office,    
       
      } = req.body;

      let location = {};

     
   

      const updateFields = {
         fname: fname ?? imgdata.fname,
            lname: lname ?? imgdata.lname,
            mname: mname ?? imgdata.mname,
            name: name ?? imgdata.name,
            email: email ?? imgdata.email,
            DOB: DOB ?? imgdata.DOB,
            Occupation: Occupation ?? imgdata.Occupation,
            ContactNo: ContactNo ?? imgdata.ContactNo,
            whatsapp: whatsapp ?? imgdata.whatsapp,
            office: office ?? imgdata.office,
            home1: home1 ?? imgdata.home1,
            home2: home2 ?? imgdata.home2,
            profilePic: profileimg ?? imgdata.profilePic,
      }

     
      const updateUser = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
          $set:  updateFields,
        },
        {new:true}
      );
      
        res.status(200).json({
          data: updateUser,
          message: "User updated successfully",
          success: true,
        });
      
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;
    
    const imgdata = await userModel.findOne({ _id: id });
      if (!imgdata) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const deleteUser = await userModel.deleteOne({
      _id: id,
    });


    if (deleteUser.deletedCount > 0) {
      if (fs.existsSync(`./uploads/${imgdata.profilePic}`)) {
        fs.unlinkSync(`./uploads/${imgdata.profilePic}`);
      }
      res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    }
    return res.status(400).json({
      message: "Something went wronggg",
      success:false
    })
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const saved = async (req, res) => {
  try {
    const { businessId } = req.body;

    console.log("business id : " + businessId);
    const business = await businessModel.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Check if the business is already saved
    const savedIds = req.user.saved.map((id) => id.toString());

    if (savedIds.includes(businessId.toString())) {
      return res.status(400).json({ message: "Business already saved !!" });
    }

    // req.user.saved.push(businessId);
    // await req.user.save();

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { saved: businessId } }, // $addToSet ensures uniqueness
      { new: true } // Return the updated document
    );

    // Add business to user's saved list

    return res.status(200).json({ message: "Business saved successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeSaved = async (req, res) => {
  try {
    const { businessId } = req.params;

    // Check if the business is already saved
    const savedIds = req.user.saved.map((id) => id.toString());

    if (!savedIds.includes(businessId.toString())) {
      return res.status(400).json({ message: "Business not found in saved" });
    }

    // req.user.saved.push(businessId);
    // await req.user.save();

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { saved: businessId } }, // $addToSet ensures uniqueness
      { new: true } // Return the updated document
    ).populate('saved');

    // Add business to user's saved list

    return res.status(200).json({
      saved: updatedUser.saved,
      message: "Business removed Successfully"
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getSaved = async (req, res) => {
  try {
    // Populate business details from saved array
    const savedBusinesses = await userModel
      .findById(req.user._id)
      .populate("saved");

    return res.status(200).json({ saved: savedBusinesses.saved });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const addAddress = async (req, res) => {
  try {
    const { addressArr,friends } = req.body;

    const addAdd = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: {
          addressArr: addressArr,
          friends:friends
        },
      },
      { new: true }
    );
        return res.status(200).json({ data: addAdd,message: "Address added successfully" });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const {_id} = req.params;
    const { ...updatedAddress } = req.body;

    const setObject = {};

    for (const key in updatedAddress) {
      setObject[`addressArr.$[elem].${key}`] = updatedAddress[key]
    }

    const user = await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: setObject },
      {
        arrayFilters: [{ "elem._id": _id }],
        new: true
      }
    );

    res.status(200).json({ data: user, message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateFriend = async (req, res) => {
  try {

    const { _id } = req.params;
    const {  ...updatedFields } = req.body;

    // Step 1: Build dynamic $set object
    const setObject = {};
    for (const key in updatedFields) {
      setObject[`friends.$[elem].${key}`] = updatedFields[key];
    }

    // Step 2: Perform the update with arrayFilters
    const user = await userModel.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: setObject },
      {
        arrayFilters: [{ "elem._id": _id }],
        new: true
      }
    );

    // Step 3: Return updated user
    res.status(200).json({ data: user, message: "Friend updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteAddress = async (req, res) => {
  try {
    const { _id } = req.params;

    const user = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        $pull: {
          addressArr: { _id },
          friends: { _id }
        }
      },
      { new: true }
    );

    res.status(200).json({ data: user, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// 


