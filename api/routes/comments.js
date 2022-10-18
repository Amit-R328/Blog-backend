const router = require("express").Router()
const Comment = require("../models/Comment")
const commentService = require("../comments.service")

//Create Comment
router.post("/", async (req, res) => {
    console.log('hereeee')
    const newComment = new Comment(req.body)
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get Comments
router.get("/:postId", async(req, res) => {
    try {
        const comments = await commentService.query(req.params.postId)
        res.status(200).json(comments)
    }catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:commentId", async(req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, {
            $set: req.body,
        },{ new: true })
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
        if (comment.username === req.body.username){
            try {
                await comment.delete()
                res.status(200).json("Comment has been deleted")
            } catch (err) {
                res.status(500).json(err)        
            }
        } else {
            res.status(401).json("You can delete only your comment")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router