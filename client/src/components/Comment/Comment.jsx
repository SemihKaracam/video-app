import React, { useEffect, useState } from 'react'
import "./comment.css"
import profile from "../../img/profile.jpg"
import axios from "axios"
import { format } from 'timeago.js'
const Comment = ({comment}) => {
  const [commentOwner,setCommentOwner] = useState({}) 
  useEffect(()=>{
    const getOwnerOfComment = async () => {
      const res = await axios.get(`/users/find/${comment.userId}`)
      setCommentOwner(res.data)
    }
    getOwnerOfComment()
  },[comment.userId])
  return (
    <div className='comment'>
      <img className='comment-profile-img' src={commentOwner.img} alt="" />
      <div className='comment-info'>
        <span className='comment-name'>{commentOwner.name} <span className='comment-date'>{format(comment.createdAt)}</span></span>
        <p className='comment-desc'>{comment.description}</p>
      </div>
    </div>
  )
}

export default Comment