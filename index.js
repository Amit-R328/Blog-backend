const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./api/routes/auth")
const userRoute = require("./api/routes/users")
const postRoute = require("./api/routes/posts")
const commentRoute = require("./api/routes/comments")
const categoryRoute = require("./api/routes/categories")
const multer = require("multer")
const path = require("path")

dotenv.config()
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MONGO"))
.catch(err=>console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/comments", commentRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)

app.listen("9000", () => {
    console.log("Backend is running")
})