import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  console.log(req.headers.authorization.split(" ")[1]);
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.json({
      success: false,
      message: "not authorized login again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET); //this gets the user ID from the token
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
