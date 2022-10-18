const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true,
    },
    post: {
        type:String,
        required:true
    },
    replays: {
        type:Array,
        required:false
    }
},
{timestamps: true}
)

module.exports = mongoose.model("Comment", CommentSchema)