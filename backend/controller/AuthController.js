import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "084186777c55a87eb04571a297c8d7451befe970ffda42ced1d34de028b06e1021de45d280409e2e88d4e022fc76fb349b1cad21e085c1f9837e49d3ae4b4d95";

export const signIn = (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "10days" });
    res.status(200).json({ token, username });
  } else {
    res.status(400).json({ message: "please fill fields." });
  }
};