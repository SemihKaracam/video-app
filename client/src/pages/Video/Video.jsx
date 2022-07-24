import React, { useEffect, useState } from 'react'
import "./video.css"
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VideoCard from '../../components/VideoCard/VideoCard'
import Comments from '../../components/Comments/Comments';
import { useLocation } from 'react-router-dom';
import axios from "axios"
import ConfirmAlert from '../../components/ConfirmAlert/ConfirmAlert';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, like, dislike } from '../../redux/videoSlice';
import { format } from 'timeago.js';
import { subscribe } from '../../redux/userSlice';
const Video = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const { currentVideo } = useSelector((state) => state.video)
  const { currentUser } = useSelector((state) => state.user)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [channel, setChannel] = useState({})
  const [waitingButton, setWaitingButton] = useState(false)

  const [alert, setAlert] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      console.log("1")
      try {
        const video = await axios.get(`/videos/find/${id}`)
        const videoData = video.data
        const user = await axios.get(`/users/find/${videoData.userId}`)
        const userData = user.data
        dispatch(fetchSuccess(videoData))
        setChannel(userData)
      } catch (err) {

      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    const getRelatedVideos = async () => {
      console.log(currentVideo.tags.join(","))
      const res = await axios.get(`/videos/tags?t=${currentVideo.tags.join(",")}`)
      setRelatedVideos(res.data)
    }
    getRelatedVideos()
  }, [id])

  useEffect(() => {
    const addView = async () => {
      await axios.put(`/videos/view/${currentVideo._id}`)
    }
    addView()
  }, [])


  const handleLike = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/users/like/${currentVideo._id}`)
      dispatch(like(currentUser._id))
    } catch (err) {
      console.log(err)
    }
  }


  const handleDislike = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id))
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!currentUser.subscribedUsers.includes(channel._id)) {
      setWaitingButton(true)
      try{
        await axios.put(`/users/subscribe/${channel._id}`)
      }catch(err){

      }finally{
        setWaitingButton(false)
      }
    }else{
      setAlert(true)
    }
    console.log(waitingButton)
    dispatch(subscribe(channel._id))
  }

  return (
    <>
      <div className='video-page'>
        <div className="left-container">
          <div className='video-wrapper'>
            <video className='video-frame' src={currentVideo.videoUrl} controls></video>
          </div>
          {/* <img className='video-thumbnail' src={thumbnail} alt="" /> */}
          <div className='view-icons'>
            <div className='view-side'>
              <p className='video-page-title'>{currentVideo?.title}</p>
              <span className='view-date'>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</span>
            </div>
            <div className="icons-side">
              <div onClick={handleLike} className='icon-container'>
                {currentVideo.likes.includes(currentUser._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                <span>{currentVideo?.likes.length}</span>
              </div>
              <div onClick={handleDislike} className='icon-container'>
                {currentVideo.dislikes.includes(currentUser._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}
                <span>Dislike</span>
              </div>
              <div className='icon-container'>
                <ReplyOutlinedIcon />
                <span>Share</span>
              </div>
              <div className='icon-container'>
                <AddTaskOutlinedIcon />
                <span>Save</span>
              </div>
            </div>
          </div>
          <div className='channel-container'>
            <div className="channel-info-container">
              <img className='video-page-profile-img' src={channel.img} alt="" />
              <div className='channel-info'>
                <h3>{channel.name}</h3>
                <span>{channel.subscribers} subscribers</span>
                <p className='video-desc'>{currentVideo?.description}</p>
              </div>
            </div>
            <button onClick={handleSubscribe} disabled={waitingButton} className='subscribe-btn'>{currentUser?.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED" : "SUBSCRIBE"}</button>
          </div>
          <Comments videoId={currentVideo._id} />
        </div>
        <div className="right-container">
          {
            relatedVideos.map((video) => (
              <VideoCard video={video} type={"sm"} />
            ))
          }
        </div>
      </div>
      {alert && <ConfirmAlert channel={channel} setAlert={setAlert}/>}
    </>
  )
}

export default Video