import { User } from "../models/User.js";
import jwt from "jsonwebtoken"
export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.json({ status: true });
  } catch (error) {
    console.log(error.code);
    if(error.code == 11000){
        res.status(400).json({error:"User already exist in database"})
    }else{
        res.status(400).json({error:"Save User action in database failed"});
    }
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(403).json({error:"User not exist in database"});
        }
        const passwordResponse = await user.comparePassword(password)
        if(!passwordResponse){
            res.status(403).json({error:"Invalid Password"})
        }
        const token = jwt.sign({uid:user.id}, process.env.JWT_SECRET);
        res.json({ok:token})
    } catch (error) {
        console.log(error)
        res.status(500).json({err: "Server Error"})
    }
};
