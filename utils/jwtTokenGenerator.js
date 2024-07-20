import jwt from "jsonwebtoken";

const generateToken = (id) => {
  const encodedToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return encodedToken;
};

export default generateToken;
