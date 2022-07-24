import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unsubscribe } from '../../redux/userSlice'
import "./confirmalert.css"
import axios from "axios"

const ConfirmAlert = ({setAlert,channel}) => {
  const dispatch = useDispatch()
  const { currentVideo } = useSelector((state) => state.video)
  const { currentUser } = useSelector((state) => state.user)
  const [waitingButton, setWaitingButton] = useState(false)

  const handleUnsub = async (e)=>{
    e.preventDefault()
    setWaitingButton(true)
    try{
      await axios.put(`/users/unsubscribe/${channel._id}`)
    }catch(err){

    }finally{
      setWaitingButton(false)
    }
    
    dispatch(unsubscribe(channel._id))
    setAlert(false)
  }

  
  return (
    <div className='confirm-alert-container'>
      <div className='confirm-alert-wrapper'>
        <p className='unsub-info'>Unsubscribe from {channel.name}</p>
        <div className='confirm-alert-btns'>
          <button className='cancel-btn' onClick={()=>setAlert(false)}>CANCEL</button>
          <button className='unsub-btn' disabled={waitingButton} onClick={handleUnsub}>UNSUBSCRIBE</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmAlert