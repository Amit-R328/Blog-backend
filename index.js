const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./api/routes/auth")
const userRoute = require("./api/routes/users")
const postRoute = require("./api/routes/posts")

dotenv.config()
app.use(express.json())

mongoose.connect(process.env.Mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log("Connected to MONGO"))
.catch(err=>console.log(err))

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)

app.listen("9000", () => {
    console.log("Backend is running")
})