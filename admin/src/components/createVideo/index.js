import axios from 'axios';
import React,{useState} from 'react';
import './createVideo.css';

const CreateVideo = () => {
    const [video,setVideo] = useState({
        url:'',
        title: '',
        body: ''
    })
    const handleChange = (e) =>{
        setVideo(video => {
            return({...video,[e.target.name]:e.target.value})
        })
    }

    const createVideo = (e) =>{
        e.preventDefault();
        const newVideo ={
            url: video.url,
            title: video.title,
            body: video.title
        }
        axios.post('/gallery',newVideo)
            .then(res=>{
                if(res.data.success){
                    console.log('video created');
                }
                if(res.data.error){
                    console.log('could not create video');
                }
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
                </div>
            </form>
        </div>
    )
}

export default CreateVideo
