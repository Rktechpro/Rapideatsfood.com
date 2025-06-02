import ContactModel from "../Models/ContactSchema.js";
import validator from "validator";
import nodemailer from "nodemailer";

export const ContactFrom = async (req, res) => {
  const { name, email, message } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Contact Form Submission from ${name}`,
    text: `You received a new message from ${name} (${email}):\n\n${message}`,
  };
  const fromcontact = new ContactModel({
    name: name,
    email: email,
    message: message,
  });

  try {
    const exitsuser = await ContactModel.findOne({ email });
    if (exitsuser) {
      return res.json({ success: false, message: "User already exits!" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a Valid email! ",
      });
    }

    await transporter.sendMail(mailOptions);
    await fromcontact.save();
    res.status(200).json({ success: true, message: "Contact User Success!" });
  } catch (error) {
    res
      .status(404)
      .json({ success: false, message: `contact is not success${error}` });
  }
};
