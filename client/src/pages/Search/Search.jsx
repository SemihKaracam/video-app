import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./search.css"
import axios from "axios"
import VideoCard from '../../components/VideoCard/VideoCard'
const Search = () => {
    const query = useLocation().search
    const [result, setResult] = useState([])

    useEffect(()=>{
        const doSearch = async () => {
            const res = await axios.get(`/videos/search/${query}`)
            setResult(res.data)
            console.log(res.data)
        }
        doSearch()  
    },[query])
    return (
        <div className='search-page'>
            
            {
                result.map((video)=>(
                    <VideoCard type="lg" video={video}/>
                ))
            }
            
        </div>
    )
}

export default Search