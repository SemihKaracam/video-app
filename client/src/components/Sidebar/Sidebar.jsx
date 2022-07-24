import React from 'react'
import "./sidebar.css"
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice';


const Sidebar = () => {
  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate("/signin")
  }
  return (
    <div className='sidebar'>
      <div className='sidebar-list'>

        <div className='sidebar-list-item'>
          <HomeIcon />
          <span>Home</span>
        </div>

        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <div className='sidebar-list-item'>
            <ExploreOutlinedIcon />
            <span>Explore</span>
          </div>
        </Link>
        <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
          <div className='sidebar-list-item'>
            <SubscriptionsOutlinedIcon />
            <span>Subscriptions</span>
          </div>
        </Link>
      </div>
      <div className='sidebar-list'>
        <div className='sidebar-list-item'>
          <VideoLibraryOutlinedIcon />
          <span>Library</span>
        </div>
        <div className='sidebar-list-item'>
          <HistoryOutlinedIcon />
          <span>History</span>
        </div>
      </div>
      {
        !currentUser &&
        <div className='sidebar-list'>
          <p>Sign in to like videos,comment,and subscribe.</p>
          <Link to="/signin" style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className='signin-btn'>
              <AccountCircleOutlinedIcon />
              <span>SIGN IN</span>
            </button>
          </Link>
        </div>
      }
      <div>

      </div>
      <div className='sidebar-list'>
        <div className='sidebar-list-item'>
          <LibraryMusicOutlinedIcon />
          <span>Music</span>
        </div>
        <div className='sidebar-list-item'>
          <SportsBasketballOutlinedIcon />
          <span>Sports</span>
        </div>
        <div className='sidebar-list-item'>
          <SportsEsportsOutlinedIcon />
          <span>Gaming</span>
        </div>
        <div className='sidebar-list-item'>
          <MovieOutlinedIcon />
          <span>Movies</span>
        </div>
        <div className='sidebar-list-item'>
          <ArticleOutlinedIcon />
          <span>News</span>
        </div>
        <div className='sidebar-list-item'>
          <LiveTvOutlinedIcon />
          <span>Live</span>
        </div>
      </div>
      <div className='sidebar-list'>
        <div className='sidebar-list-item'>
          <SettingsOutlinedIcon />
          <span>Settings</span>
        </div>
        <div className='sidebar-list-item'>
          <FlagOutlinedIcon />
          <span>Report</span>
        </div>
        <div className='sidebar-list-item'>
          <HelpOutlineOutlinedIcon />
          <span>Help</span>
        </div>
        <div className='sidebar-list-item'>
          <SettingsBrightnessOutlinedIcon />
          <span>Light Mode</span>
        </div>
        {
          currentUser &&
          <div onClick={handleLogout} className='sidebar-list-item'>
            <LogoutOutlinedIcon />
            <span>Logout</span>
          </div>
        }
      </div>
    </div>
  )
}

export default Sidebar
