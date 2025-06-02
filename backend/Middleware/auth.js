import jwt from "jsonwebtoken";

const middlewareAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "not authorized please login Again!",
    });
  }
  try {
    const token_Decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.UserId = token_Decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error!" });
  }
};

export default middlewareAuth;
