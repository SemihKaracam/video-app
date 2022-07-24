import React from 'react'
import { useState } from 'react'
import { useDispatch } from "react-redux"
import "./signin.css"
import axios from "axios"
import { auth, provider } from "../../firebase.js"
import { signInWithPopup } from 'firebase/auth'
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault()
        dispatch(loginStart())
        try {
            const res = await axios.post("/auth/signin", { name, email, password })
            dispatch(loginSuccess(res.data))
            navigate("/")
        } catch (err) {
            dispatch(loginFailure())
        }
    }
    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider)
            .then((result) => {
                axios.post("/auth/google",{
                    name:result.user.displayName,
                    email:result.user.email,
                    img:result.user.photoURL
                }).then((res)=>{
                    dispatch(loginSuccess((res.data)))
                })
            })
            .catch((err)=>{
                dispatch(loginFailure())
            })
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        console.log({ name, email, password })
    }
    return (
        <div className='signin-container'>
            <form className='signin-form'>
                <h3 className='form-title'>Sign in</h3>
                <p className='form-desc'>to continue to VideoTube</p>
                <div className='signin form-item'>
                    <input onChange={(e) => setName(e.target.value)} required placeholder='username' type="text" />
                    <input onChange={(e) => setPassword(e.target.value)} required placeholder='password' type="text" />
                    <button onClick={handleLogin} className='form-btn'>Sign in</button>
                </div>
                <p style={{ margin: "10px 0px" }}>or</p>
                <button className='form-btn' onClick={signInWithGoogle}>Sign with Google</button>
                <p style={{ margin: "10px 0px" }}>or</p>

                <div className='signup form-item'>
                    <input onChange={(e) => setName(e.target.value)} required placeholder='username' type="text" />
                    <input onChange={(e) => setEmail(e.target.value)} required placeholder='email' type="text" />
                    <input onChange={(e) => setPassword(e.target.value)} required placeholder='password' type="text" />
                    <button onClick={handleRegister} className='form-btn'>Sign up</button>
                </div>
            </form>
        </div>
    )
}

export default Signin