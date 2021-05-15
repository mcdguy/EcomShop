import axios from 'axios';
import React,{useState,useRef,useEffect} from 'react'
import './editVideo.css';
import Loader from '../loader';
import Error from '../error';
import Alert from '../alert';
import { useGlobalContext,baseUrl } from '../../context';
import ValidateError from '../validateError';
import {handleVideoError} from '../../utils/handleError';

const EditVideo = ({id}) => {
    const {fetchGallery} = useGlobalContext();
    const [video,setVideo] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);
    const urlRef = useRef(null);
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    
    const [editError,setEditError] = useState([]);
    const [editLoader,setEditLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    useEffect(()=>{
        setIsLoading(true);
        setError(false);
        axios.get(`${baseUrl}/gallery/${id}`)
            .then(res=>{
                if(res.data.video){
                    setVideo(res.data.video);
                }
                setIsLoading(false);
            })
            .catch(err =>{
                setError(true);
                console.log({error: 'an error occurred'})
            })
    },[])
    
    const editVideo = (e) =>{
        e.preventDefault();
        const error = handleVideoError(urlRef.current.value);
        if(error.length>0){
            setEditError(error);
            return;
        }
        if(error.length === 0){
            setEditError([]);
        }
        setEditLoader(true);

        const newVideo={
            url: urlRef.current.value,
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        axios.patch(`${baseUrl}/gallery/${video._id}`,newVideo)
            .then(res =>{
                if(res.data.success){
                    console.log('video updated');
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
                setEditLoader(false);
            })
        console.log(newVideo);
    }

    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
    }

    if(!video) return null;

    return (
        <div className="action__create">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>url</div>
                            </td>
                            <td>
                                <div><input ref={urlRef} type="text" defaultValue={video.url}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>title</div>
                            </td>
                            <td>
                                <div><input ref={titleRef} type="text" defaultValue={video.title}/></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>body</div>
                            </td>
                            <td>
                                <div><textarea ref={bodyRef} className="text__body" type="text" defaultValue={video.body}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>editVideo(e)} className="btn">edit video</button>
                    {editError.length?<ValidateError error={editError}/>:null}
                    {editLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default EditVideo
