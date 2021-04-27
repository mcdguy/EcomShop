import React from 'react';
import { useGlobalContext } from '../../context';
import './gallery.css';

const Gallery = () => {
    const {videos} = useGlobalContext();

    return (
        <div className="gallery">
            <div className="gallery__center center">
            {videos.map(v=>{
                return(
                    <div className="gallery__video" key={v._id}>
                        <div className="video__wrapper">
                            <iframe src={v.url} frameBorder="0" allowFullScreen></iframe>
                        </div>
                        {/* <div className="video__info">
                            <h1>{v.title}</h1>
                            <p>{v.body}</p>
                        </div> */}
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default Gallery
