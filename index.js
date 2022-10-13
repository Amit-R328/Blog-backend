const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./api/routes/auth")
const userRoute = require("./api/routes/users")
const postRoute = require("./api/routes/posts")
const categoryRoute = require("./api/routes/categories")
const multer = require("multer")

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MONGO"))
.catch(err=>console.log(err))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "api\\images")
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpeg")
    },
})

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req,res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)

app.listen("9000", () => {
    console.log("Backend is running")
})