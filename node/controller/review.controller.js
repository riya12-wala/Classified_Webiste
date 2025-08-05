import reviewModel from "../model/review.model";
import multer from "multer";
import fs  from "fs";
import path from "path";
import mongoose from "mongoose";

const storage = multer.diskStorage({
  destination: function (res, file, cb) {
    if (!fs.existsSync("./reviews")) {
      fs.mkdirSync("./reviews");
    }
    cb(null, "./reviews");
  },
  filename: function (req,file, cb) {
    const orgname = file.originalname;
    console.log(orgname)
    const name = path.parse(orgname).name;
    const ext = path.parse(orgname).ext;
    const unique = Date.now();

    cb(null, name + "- " + unique + ext);
  },
});

const upload = multer({ storage: storage });

export const addReviews = async (req, res) => {
  try {
    const addFile = upload.fields([{ name: "images", maxCount: 10 }]);

    addFile(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
       const businessId = req.params.businessId;
      const userId = req.user?._id
      const { rating, comment } = req.body;

      const imageArr = req.files?.["images"] ? req.files["images"].map((el) => el.filename) : [];

     

      // Create the review
      const review = await reviewModel.create({
        businessId,userId,
        rating,
        comment,
        images: imageArr || [],
      });

      
    
      return res.status(200).json({
        data: review,
       
        message: "Review added successfully",
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


export const getreview = async (req, res) => {
  try {
      let { page = 1, limit = 6 } = req.query;
    page = parseInt(page);
limit = parseInt(limit);
    
    const skip = (page - 1) * limit;
    const review = await reviewModel.find().populate({path:'userId',select:'name profilePic'}).limit(limit).skip(skip).sort({ createdAt: -1 });;

    return res.status(200).json({
      data: review,
      message: "Fetched Successfully !!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something Went Wrong!",
      success: false,
    });
  }
};


export const getReviewById = async (req, res) => {
  try {
    const { id  } = req.params;
    const review = await reviewModel.find({ businessId: id }).populate({
    path: 'userId',
    select: 'name profilePic'  // Only include name and profilePic
  })

    const aggregation = await reviewModel.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(id.toString()) } },
      
        {
          $group: {
            _id: "$businessId",
            avgRatingRaw: { $avg: "$rating" },
            ratingCount: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            ratingCount: 1,
            avgRating: { $round: ["$avgRatingRaw", 1] }
          }
        }
      
    ]);

    const ratingStats = aggregation[0] || {
      avgRating: 4.5,
      ratingCount: 12,
    };


    return res.status(200).json({
      data: review,
      avgRating: ratingStats.avgRating,
      ratingCount: ratingStats.ratingCount,
      message: "Fetched Successfully !!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const getReviewByIdPagination = async (req, res) => {
  try {
    const { id } = req.params;

    let { page = 1, limit = 5 } = req.query;
    page = parseInt(page);
limit = parseInt(limit);
    
    const skip = (page - 1) * limit;

    const review = await reviewModel.find({ businessId: id }).populate({
    path: 'userId',
    select: 'name profilePic'  // Only include name and profilePic
  }).limit(limit).skip(skip).sort({ createdAt: -1 });

    const aggregation = await reviewModel.aggregate([
      { $match: { businessId: new mongoose.Types.ObjectId(id.toString()) } },
      
        {
          $group: {
            _id: "$businessId",
            avgRatingRaw: { $avg: "$rating" },
            ratingCount: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            ratingCount: 1,
            avgRating: { $round: ["$avgRatingRaw", 1] }
          }
        }
      
    ]);

    const ratingStats = aggregation[0] || {
      avgRating: 0,
      ratingCount: 0,
    };


    return res.status(200).json({
      data: review,
      avgRating: ratingStats.avgRating,
      ratingCount: ratingStats.ratingCount,
      message: "Fetched Successfully !!",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


export const getReviewByUserId = async (req, res) => {
  try {


    const userId = req.user?._id;

    const review = await reviewModel.find({ userId: userId }).populate({ path: "userId", select: "name fname profilePic" }).populate({ path: 'businessId' ,select :' name address.street contact.phone'}).sort({ createdAt: -1 });

    return res.status(200).json({
      data: review,
      count: review.length,
      message: "Fetched Successfully !!",
      success: true,
    });

  } catch (error) { 
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};






export const updateReview = async (req, res) => {

  try {

    const addFile = upload.fields([
      {name:"images",maxCount:10}
    ])

    addFile (req,res,async function (err) {
      if (err) { return res.status(400).json({ message: err.message }) }



      const { id } = req.params;
      const imagedata = await reviewModel.findOne({_id:id});

      console.log(imagedata)

      const imageArr = req.files["images"]
      ? req.files["images"].map((el) => el.filename)
      : imagedata.images;

        console.log(imagedata.images[4][0])

      // const { businessId, userId, rating, comment } = req.body;
  
      const updateReview = await reviewModel.updateOne(
        { _id: id },
        {
          $addToSet: {
            // businessId: businessId,
            // userId: userId,
            // rating: rating,
            // comment: comment,
            images:imageArr
            
          }  
        },
        {new:true}
      );
  
      if (updateReview.modifiedCount > 0) {
        return res.status(200).json({
          data: updateReview,
          message: "Updated succesfully",
          success: true,
        });
      }

    })
 
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deletereview = async (req, res) => {
  try {
    const { id } = req.params;

    const deletereview = await reviewModel.deleteOne({ _id: id });
    res.status(200).json({
      message: "deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
