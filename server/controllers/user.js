import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"
//update user
export const update = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true })
            res.status(200).json(updatedUser)
        } catch (err) {
            console.log("HAta")
            next(err)
        }
    }
    else {
        return next(createError(403, "You can update only your account!"))
    }
}



export const deleteUser = async (req, res, next) => {
    if (req.user.id === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User has been deleted succesfully.")
        } catch (err) {
            next(err)
        }
    }
    else {
        next(createError(403, "You can delete only your account"))
    }
}


export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password,...others } = user._doc
        res.status(200).json(others)
    } catch (err) {
        next(err)
    }
}



export const subscribe = async (req, res, next) => {
    try {
        // the person i will subscribe
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {
                subscribers: 1
            }
        })


        // subscriber
        await User.findByIdAndUpdate(req.user.id, {
            $addToSet: {
                subscribedUsers: req.params.id
            }
        })
        res.status(200).json("Subscription succesfull")
    }
    catch (err) {
        next(err)
    }
}



export const unsubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        })

        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        })

        res.status(200).json("Unsubscription successfull")
    } catch (err) {
        next(err)
    }
}



export const likeVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: { likes: req.user.id },
            $pull: { dislikes: req.user.id }
        }, { new: true })
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}

export const dislikeVideo = async (req, res, next) => {
    try {
        const video = await Video.findByIdAndUpdate(req.params.videoId, {
            $addToSet: { dislikes: req.user.id },
            $pull: { likes: req.user.id }
        }, { new: true })
        res.status(200).json(video)
    } catch (err) {
        next(err)
    }
}
