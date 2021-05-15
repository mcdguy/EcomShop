import React,{useState,useEffect} from 'react';
import './video.css';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import VideoRow from '../videoRow';
import Loader from '../loader';
import Error from '../error';

const Video = () => {
    const {videos,isVideosLoading,videoError,type} = useGlobalContext();
    const [filter,setFilter] = useState('title');
    const [query,setQuery] = useState('');
    const [filteredVideos,setFilteredVideos] = useState([]);
    
    useEffect(()=>{
        if(query===''){
            setFilteredVideos(videos);
        }
        let newVideos = videos.filter(v =>{
            return(v[filter].toString().toLowerCase().indexOf(query.toLowerCase())>=0)
        })
        setFilteredVideos(newVideos);
    },[query,videos])

    if(isVideosLoading){
        return <Loader/>
    }
    if(videoError){
        return <Error/>
    }
    if(!videos) return null;
    return (
        <div className="read__locations action__read">
            <nav className="video__nav control__nav">
                <div>
                    <input className="search" autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                        <option value="title">title</option>
                    </select>
                </div>
                {type!=='read admin'?<Link to="/create" className="btn">create</Link>:null}
            </nav>
            {filteredVideos.length?
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>url</div>
                            </th>
                            <th>
                                <div>title</div>
                            </th>
                            {type!=='read admin'?<th className="read__table__edit"></th>:null}
                            {type!=='read admin'?<th className="read__table__delete"></th>:null}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVideos.map(v=>{
                            return(
                                <VideoRow {...v} key={v._id}/>
                            )
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Video
