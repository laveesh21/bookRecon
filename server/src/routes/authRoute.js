import express from "express"
import User from "../models/User.js"
import jsonwebtoken from "jsonwebtoken"


const router = express.Router()

const generateToken = (userId) => {
  return jsonwebtoken.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" })
}

// New User Register
router.post("/register", async (req, res) => {
  try{
    const {email, username, password } = req.body

    if(!username || !password || !email){
      return res.status(400).json({ error: "All fields are required" })
    }

    if(password.length < parseInt(process.env.PASSWORD_LENGTH)){
      return res.status(400).json({ error: "Password must be at least 4 characters long" })
    }

    if(username.length < 3){
      return res.status(400).json({ error: "Username must be at least 3 characters long" })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })

    if(existingUser){
      return res.status(400).json({ error: "User already exists with this email or username" })
    }
    
    //get random avatar
    const profileImage = `https://api.dicebear.com/10.x/lorelei/svg?seed=${username}`

    const user = new User({
      email,
      username,
      password,
      profileImage,
    })

    await user.save()

    const token = generateToken(user._id)

    console.log("User registered successfully:", { user, token });

    res.status(200).json({
      token,
      user:{
        id:user._id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
      }
    })

  }catch(error){
    res.status(500).json({ error: error.message })
  } 
})

// Existing Login
router.post("/login", async (req, res) => {
  try{

    const {username, password} = req.body

    if(!username || !password){
      return res.status(400).json({ error: "Username and password are required" })
    }

    const user = await User.findOne({ username })

    if(!user){
      return res.status(400).json({ error: "Invalid username or password" })
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
      return res.status(400).json({ error: "Invalid username or password" })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      token,
      user:{
        id:user._id,
        email: user.email,
        username: user.username,
        profileImage: user.profileImage
      }
    })

  }catch(error){  
    res.status(500).json({ error: error.message })
  }

})

export default router

