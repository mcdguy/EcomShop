import axios from 'axios';
import React,{useState,useRef,useEffect} from 'react'
import './editVideo.css';
const EditVideo = ({id}) => {
    const [video,setVideo] = useState(null);
    const urlRef = useRef(null);
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    useEffect(()=>{
        axios.get(`/gallery/${id}`)
            .then(res=>{
                if(res.data.video){
                    setVideo(res.data.video);
                }
            })
            .catch(err => console.log({error: 'an error occurred'}))
    },[])
    
    const editVideo = (e) =>{
        e.preventDefault();
        const newVideo={
            url: urlRef.current.value,
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        axios.patch(`/gallery/${video._id}`,newVideo)
            .then(res =>{
                if(res.data.success){
                    console.log('video updated');
                }
            })
        console.log(newVideo);
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
                </div>
            </form>
        </div>
    )
}

export default EditVideo
