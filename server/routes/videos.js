import express from "express"
import { addView, createVideo, deleteVideo, getBySearch, getByTag, getVideo, randomVideos, subVideos, trendVideos, updateVideo } from "../controllers/video.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()

router.post("/",verifyToken,createVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)

router.put("/view/:id",addView)
router.get("/random",randomVideos)
router.get("/trend",trendVideos)
router.get("/sub",verifyToken,subVideos)

router.get("/tags",getByTag)
router.get("/search",getBySearch)




export default router