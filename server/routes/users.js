import express from "express"
import { deleteUser, dislikeVideo, getUser, likeVideo, subscribe, unsubscribe, update } from "../controllers/user.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()

//update user
router.put("/:id",verifyToken,update)

//delete user
router.delete("/:id",verifyToken,deleteUser)

//get user
router.get("/find/:id",getUser)

//subscribe
router.put("/subscribe/:id",verifyToken,subscribe)

//unsubscribe
router.put("/unsubscribe/:id",verifyToken,unsubscribe)

//like
router.put("/like/:videoId",verifyToken,likeVideo)

//dislike
router.put("/dislike/:videoId",verifyToken,dislikeVideo)


export default router