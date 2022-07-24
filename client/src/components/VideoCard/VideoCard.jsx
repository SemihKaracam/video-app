import React from 'react'
import "./videocard.css"
import profile from "../../img/profile.jpg"
import thumbnail from "../../img/thumbnail.jpg"
import { Link } from 'react-router-dom'
import { format } from "timeago.js"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios"

const VideoCard = ({ video,type }) => {
    const [channel, setChannel] = useState()
    useEffect(()=>{
        const fetchChannel = async () => {
            const res = await axios.get(`/users/find/${video.userId}`)   
            setChannel(res.data)
        }
        fetchChannel()
    },[video?.userId])
    const styleCard = {
        width:type === "sm" ? "400px" : "280px",
        display:type === "sm" ? "flex":"block",
        cursor:"pointer",
        gap:"10px"
    }
    const styleThumbImg = {
        width: type==="sm" ? "170px" : "100%",
        backgroundColor: "#999",
        height: "158px",
    }

    const styleProfileImg = {
        display:type==="sm" ? "none" : "unset"
    }

    return (
        <Link to = {`/video/${video._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={styleCard} className="video-card">
                <img style={styleThumbImg}  className='thumbnail-img' src={video.imgUrl} alt="" />
                <div className='user-info'>
                    <img style={styleProfileImg} className='profile-img' src={channel?.img} alt="" />
                    <div className='video-description'>
                        <h3 className='video-title'>{video.title}</h3>
                        <span className='channel-name'>{channel?.name}</span>
                        <span className='view-text'>{video.views} views • {format(video.createdAt)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard