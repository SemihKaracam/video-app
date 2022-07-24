import { createError } from "../error.js"
import Comment from "../models/Comment.js"
export const addComment = async (req, res, next) => {
    try {
        const comment = new Comment({ ...req.body, userId: req.user.id})
        const savedComment = await comment.save()
        res.status(200).json(savedComment)
    } catch (err) {
        next(err)
    }
}


export const deleteComment = async (req, res, next) => {

    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(comment.videoId)
        if(req.user.id === comment.userId || video.userId === req.user.id){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted")
        }else{
            next(createError(403), "Comment can delete only by video owner or comment owner")
        }
    }
    catch (err) {
        next(err)
    }
    

}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}