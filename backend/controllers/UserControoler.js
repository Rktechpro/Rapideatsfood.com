import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import foodUserModel from "../Models/UserSchema.js";

//Singup User
const SingupUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking user already exits
    const exits = await foodUserModel.findOne({ email });
    if (exits) {
      return res.json({ success: false, message: "User already exits!" });
    }

    // validator in use of email formate and  storng password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a Valid email! ",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a Strong password! ",
      });
    }
    //hashing method user password
    const userPasswordIncrypt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, userPasswordIncrypt);

    const newUser = new foodUserModel({
      name: name,
      email: email,
      password: hashPassword,
    });
    //save your user data
    const User = await newUser.save();
    //create your token
    const token = createToken(User._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Error! " });
  }
};

//token gen
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//login user
const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const UserLogin = await foodUserModel.findOne({ email });
    //user not available
    if (!UserLogin) {
      return res
        .status(500)
        .json({ success: false, message: "User Do not exits!" });
    }
    //password matching
    const IsMatch = await bcrypt.compare(password, UserLogin.password);
    if (!IsMatch) {
      return res.status(500).json({
        success: false,
        message: "do not match your password!",
      });
    }
    //login token
    const token = createToken(UserLogin._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error!" });
  }
};
export { LoginUser, SingupUser };
