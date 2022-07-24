import React, { useEffect } from 'react'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import youtubeIcon from "../../img/logo.png"
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Upload from '../UploadVideoModal/Upload';
import axios from "axios"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


const Navbar = () => {
  const { currentUser } = useSelector(state => state.user)
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const toggleMenu = () => {
    const sidebar = document.querySelector(".sidebar")
    sidebar.classList.toggle("show")
  }

  const handleSearch = (e) => {
    if (searchTerm !== "") {
      navigate(`/search?s=${searchTerm}`)
    }
  }

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }
  return (
    <>
      <div className='navbar'>
        <div className="nav-left">
          <MenuRoundedIcon onClick={toggleMenu} className='nav-menu-icon' />
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="logo-title">
              <img className='nav-logo' src={youtubeIcon} alt="" />
              <h3 className='nav-title'>VideoTube</h3>
            </div>

          </Link>
        </div>
        <div className="nav-center">
          <input onKeyPress={handleEnter} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search' type="text" />
          {/* <Link to={"/search?s=" + searchTerm} style={{ textDecoration: 'none', color: 'inherit' }}>
            <SearchOutlinedIcon />
          </Link> */}
          <SearchOutlinedIcon onClick={handleSearch} />

        </div>
        <div className="nav-right">
          {
            !currentUser ?
              (<Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
                <button>
                  <AccountCircleOutlinedIcon className="nav-icon" />
                  <span>SIGN IN</span>
                </button>
              </Link>) :
              (
                <>
                  <VideoCallOutlinedIcon style={{ cursor: "pointer" }} onClick={() => setOpen(true)} />
                  <img className='navbar-img' referrerpolicy="no-referrer" src={currentUser.img} />
                  <span className='username'>{currentUser.name}</span>
                </>
              )
          }
        </div>
      </div>
      {open && <Upload setOpen={setOpen} />}
    </>
  )
}

export default Navbar
