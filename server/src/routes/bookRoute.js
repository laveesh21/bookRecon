import express from "express"
import protectRoute from "../middleware/auth.middleware"
import Book from "../models/Book.js"
const router = express.Router()

router.get("/", async(req, res) => {   
    try{
        const {limit, page} = req.query
        limit = parseInt(limit) || 10
        page = parseInt(page) || 1
        const offset = (page - 1) * limit
        
        const books = await Book.find()
            .sort({createdAt : -1})
            .skip(offset)
            .limit(limit)
            .populate("user", "username profileImage")
            .select("-password")
        const total = await Book.countDocuments()

        res.status(200).json({books, total, limit, page})

    }catch(error){
        res.status(500).json({error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    try{
        const {id} = req.params
        if(!id ||!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message: "Invalid book id"})
        }   
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({message: "Book not found"})
        }
        res.status(200).json(book)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

router.post("/addbook", protectRoute ,async (req, res) => {
    try{
        const {title, author, caption, coverImage} = req.body

        if(!title || !author || !caption){
            return res.status(400).json({message: "All fields are required"})
        }

        if(coverImage){
            const uploadResponse = await cloudinary.uploader.upload(coverImage, {
                folder: "books"
            })
            coverImage = uploadResponse.secure_url
        }

        const book = new Book({title, author, caption, coverImage})
        await book.save()
        res.status(201).json(book)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


router.delete("/:id", protectRoute ,async (req, res) => {
    try{
        const {id} = req.params

        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        if(book.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: "Unauthorized"})
        }

        if(book.coverImage && book.coverImage.includes("cloudinary")){
            try{
                const publicId = book.coverImage.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(publicId)
            }catch(error){
                console.error("Error deleting cover image:", error)
            }
        }

        await Book.deleteOne({_id: id})

        res.status(200).json({message: "Book deleted successfully"})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

export default router

