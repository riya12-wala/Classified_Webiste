import bcrypt from "bcryptjs";
import userModel from "../model/user.model";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import springedge from "springedge";
import { parseString } from 'xml2js'; 
import axios from 'axios'
import businessModel from "../model/business.model";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel
      .findOne({ email: email.trim() })
      .select("+password");
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ message: "Invalid credentials", sucess: false });

    const userData = await userModel
      .findOne({ email: email })
      .select("-password");

    const token = jwt.sign(
      { data: { id: userData._id } },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ data: userData, token: token, message: "Login Successfull" ,filepath: 'http://localhost:4001/node-files'});
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const signup = async (req, res) => {
  try {
  
    const { email, password, name, ContactNo } = req.body;
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      name: name,
      ContactNo: ContactNo,
    });
    res
      .status(200)
      .json({
        data: result,
        message: "User created successfully",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getsignuplist = async (req, res) => {
  try {
    const userData = await userModel.find().select("+password");
    res
      .status(200)
      .json({
        data: userData,
        message: "User list fetched successfully",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const forgetPass = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(404).json({ message: "Please provide Email" });
    const user = await userModel.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    //generate jwt reset token

    // const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    //   expiresIn: "15m",
    // });

    // create reset link
    const resetLink = `${process.env.CLIENT_URL}/resetpass`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send mails
    const mailOptions = {
      from: process.env.EMAIL_USER, // Fixed sender email
      to: user.email, // Recipient (user's email)
      subject: "Password Reset Request",
      html: `<p>Click the link to reset your password:</p>
               
                   <a href="${resetLink}" target="_blank">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Reset link has been sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const resetPass = async (req, res) => {
  try {
    const {email,newPassword } = req.body;
    if (!newPassword)
      return res.status(400).json({ message: "Please provide all fields" });

    
    const user = await userModel.findOne({ email: email });


    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await userModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};




export const verfication = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 5);

    const findNumber = await businessModel.findOne({ "contact.phone": phone });  
    const url = `https://instantalerts.co/api/web/send`;
    const params = {
      apikey: '62s3691j30qj435dfc9dwoxu835g2i8wv',
      sender: 'SEDEMO',
      to: phone,
      message: `Mobile Number verification code is ${otp} Do not share it`,
      format: 'json'
    };

    const { data } = await axios.get(url, { params });

    
    
    req.session.otp = otp.toString();
    req.session.phone = phone;
    req.session.expiresAt = expiryTime;

    console.log('SMS Response:', data);

    return res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const verifyOTP = async (req, res) => {
  const { otp } = req.body;

  const sessionOtp = req.session.otp;
  const sessionPhone = req.session.phone;
  const expiresAt = req.session.expiresAt;

  if (!sessionOtp || !sessionPhone || !expiresAt) {
    return res.status(400).json({ message: "Session expired or invalid." });
  }

  if (new Date() > new Date(expiresAt)) {
    return res.status(410).json({ message: "OTP expired." });
  }

  if (otp !== sessionOtp) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  // Success! You can now verify the user
  // Example: await businessModel.updateOne({ "contact.phone": sessionPhone }, { isVerified: true });

  // Clear OTP session
  req.session.otp = null;
  req.session.phone = null;
  req.session.expiresAt = null;

  return res.status(200).json({ message: "OTP verified successfully." });
};


