import React,{useState,useEffect} from 'react';
import './video.css';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import VideoRow from '../videoRow';

const Video = () => {
    const {videos} = useGlobalContext();
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

    if(!videos) return null;
    return (
        <div className="read__locations action__read">
            <nav className="video__nav control__nav">
                <Link to="/create" className="btn">create</Link>
                <input autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value="title">title</option>
                </select>
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
                            <th className="read__table__edit"></th>
                            <th className="read__table__delete"></th>
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
