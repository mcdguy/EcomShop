import React,{useState,useEffect} from 'react';
import './video.css';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import VideoRow from '../videoRow';

const Video = () => {
    const {videos} = useGlobalContext();
    if(!videos) return null;
    return (
        <div className="read__locations action__read">
            <nav className="video__nav control__nav">
                <Link to="/create" className="btn">create</Link>
            </nav>
            {videos.length?
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
                        {videos.map(v=>{
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
