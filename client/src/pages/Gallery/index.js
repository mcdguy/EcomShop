import React from 'react';
import { useGlobalContext } from '../../context';
import './gallery.css';
import Loader from '../../components/loader';
import Error from '../../components/error';

const Gallery = () => {
    const {videos,galleryError,galleryLoading} = useGlobalContext();

    if(galleryLoading){
        return <Loader/>
    }
    if(galleryError){
        return <Error/>
    }
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
