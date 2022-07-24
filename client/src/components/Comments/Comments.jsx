import React, { useState } from 'react'
import "./comments.css"
import profile from "../../img/profile.jpg"
import Comment from '../Comment/Comment'
import { useEffect } from 'react'
import axios from "axios"
import { useSelector } from 'react-redux'

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([])
  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo } = useSelector((state) => state.video)
  const [commentButton,setCommentButton] = useState(false)
  const [inputComment, setInputComment] = useState("")
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${videoId}`)
      setComments(res.data)
    }
    fetchComments()
  }, [videoId])

  const handleComment = async (e) => {
    e.preventDefault()
    const res = await axios.post("/comments", { description: inputComment, videoId: currentVideo._id })
    setComments([ ...comments, res.data ])
    setInputComment("")
    setCommentButton(false)
  }
  return (
    <div className='comments-container'>
      <div className='user-comment'>
        <img className='comment-profile-img' src={currentUser.img} alt="" />
        <div className='comment-input-container'>
          <input onClick={()=>setCommentButton(true)} value={inputComment} onChange={(e) => setInputComment(e.target.value)} className='comment-input' type="text" placeholder='Add a comment...' />
          <button style={{display: commentButton ? "unset" : "none"}} onClick={handleComment} className='comment-btn'>COMMENT</button>
        </div>
      </div>

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))
      }
    </div>
  )
}

export default Comments