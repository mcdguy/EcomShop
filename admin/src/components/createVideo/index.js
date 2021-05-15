import axios from 'axios';
import React,{useState} from 'react';
import './createVideo.css';
import Alert from '../alert';
import Loader from '../loader';
import { useGlobalContext,baseUrl } from '../../context';
import ValidateError from '../validateError';
import {handleVideoError} from '../../utils/handleError';

const CreateVideo = () => {
    const {fetchGallery} = useGlobalContext();
    const [video,setVideo] = useState({
        url:'',
        title: '',
        body: ''
    })
    const [createError,setCreateError] = useState([]);
    const [createLoader,setCreateLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});

    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    const handleChange = (e) =>{
        setVideo(video => {
            return({...video,[e.target.name]:e.target.value})
        })
    }

    const createVideo = (e) =>{
        e.preventDefault();
        const error = handleVideoError(video.url);
        if(error.length>0){
            setCreateError(error);
            return;
        }
        if(error.length === 0){
            setCreateError([]);
        }
        setCreateLoader(true);
        const newVideo ={
            url: video.url,
            title: video.title,
            body: video.title
        }
        axios.post(`${baseUrl}/gallery`,newVideo)
            .then(res=>{
                if(res.data.success){
                    console.log('video created');
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.success,show:true});
                    })
                    fetchGallery();
                }
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                }
                setCreateLoader(false);
            })
        .catch(err => console.log({error: 'could not save location'}));
    }
    return (
        <div className="action__create page">
            <form>
                <table className="create__location__table">
                    <tbody>

                        <tr>
                            <td>
                                <div>url</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={video.url} name="url" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>title</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={video.title} name="title" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>body</div>
                            </td>
                            <td>
                                <div><input autoComplete="off" type="text" value={video.body} name="body" onChange={(e)=>handleChange(e)}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>createVideo(e)} className="btn">publish video</button>
                    {createError.length?<ValidateError error={createError}/>:null}
                    {createLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default CreateVideo
