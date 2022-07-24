import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const createVideo = async (req, res, next) => {
    try {
        const video = new Video({ ...req.body, userId: req.user.id })
        await video.save()
        res.status(200).json(video)
    }
    catch (err) {
        next(err)
    }
}

export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404), "Video not found")
        if (video.userId === req.user.id) {
            const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true })
            res.status(200).json(updatedVideo)
        }
        else {
            next(createError(403, "You can update only your video"))
        }
    } catch (err) {
        next(err)
    }

}
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        if (!video) return next(createError(404), "Video not found")
        if (video.userId === req.user.id) {
            await Video.findByIdAndDelete(req.params.id)
            res.status(200).json("Video has been deleted")
        }
        else {
            next(createError(403, "You can update only your video"))
        }
    } catch (err) {
        next(err)
    }
}
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id)
        res.status(200).json(video)
    }
    catch (err) {
        next(err)
    }
}


export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })
        res.status(200).json("The view has been increased")
    } catch (err) {
        next(err)
    }
}


export const randomVideos = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]); // You want to get 5 docs
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const trendVideos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 })
        res.status(200).json(videos)

    } catch (err) {
        next(err)
    }
}

export const subVideos = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers
        const list = await Promise.all(
            subscribedChannels.map(async(channelId) => {
                return await Video.find({ userId: channelId })
            })
        )
        res.status(200).json(list.flat())
    } catch (err) {
        next(err)
    }
}


export const getByTag = async (req, res, next) => {
    const tags = req.query.t
    const tagsArray = tags.split(",")
    try {
        const videos = await Video.find({
            tags: {
                $in: tagsArray
            }
        }).limit(20)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}

export const getBySearch = async (req, res, next) => {
    const search = req.query.s
    try {
        const videos = await Video.find({ title: { $regex: search, $options: "i" } }).limit(40)
        res.status(200).json(videos)
    } catch (err) {
        next(err)
    }
}



