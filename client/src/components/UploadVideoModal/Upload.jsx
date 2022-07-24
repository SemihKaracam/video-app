import React, { useEffect, useState } from 'react'
import "./upload.css"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Upload = ({ setOpen }) => {
    const [img, setImg] = useState()
    const [video, setVideo] = useState()
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL };
                    });
                });
            }
        );
    };

    useEffect(() => {
        video && uploadFile(video, "videoUrl");
    }, [video]);

    useEffect(() => {
        img && uploadFile(img, "imgUrl");
    }, [img]);

    const handleUpload = async (e) => {
        e.preventDefault()
        const res = await axios.post("/videos",{...inputs,tags})
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }

    return (
        <div className='upload-container'>
            <div className='upload-wrapper'>
                <div onClick={() => setOpen(false)} className='close'>X</div>
                <h3 className='upload-title'>Upload a New Video</h3>
                <div className='video-info'>
                    <p>Video: {video && videoPerc + "%"}</p>
                    <input onChange={(e) => setVideo(e.target.files[0])} accept="video/*" type="file" />
                    <input name="title" onChange={handleChange} type="text" placeholder='Title' />
                    <textarea name="description" onChange={handleChange} rows={8} placeholder='Description' />
                    <input onChange={(e) => setTags(e.target.value.split(","))} type="text" placeholder='Seperate the tags with commas' />
                    <p>Image: {img && imgPerc + "%"}</p>
                    <input onChange={(e) => setImg(e.target.files[0])} accept="image/*" type="file" />
                    <button onClick={handleUpload} className='upload-btn'>Upload</button>
                </div>
            </div>
        </div>
    )
}

export default Upload