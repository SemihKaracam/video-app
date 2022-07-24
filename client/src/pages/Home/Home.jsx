import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import VideoCard from '../../components/VideoCard/VideoCard'
import "./home.css"
import axios from "axios"
const Home = ({ type }) => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/${type}`)
      setVideos(res.data)
    }
    fetchVideos()
  }, [type])
  return (
    <div className='home'>
      <div className="home-wrapper">
        {
          videos.map((video) => (
            <VideoCard video={video} key={video._id} />
          ))
        }
      </div>
    </div>
  )
}

export default Home