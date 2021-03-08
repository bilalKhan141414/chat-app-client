import React, {useEffect, useRef, useState} from 'react'
import UploadingLoader from './../Loader/UploadingLoader'
import useUploader from '../../shared/custom-hooks/useUploader';
import playBtn from './../../assets/play-button.svg';
import useMessageEncryption from '../../shared/custom-hooks/useMessageEncryption';

export default function VideoElement({
    file,
    message,
    incomming
}) {
    
    const {encode} = useMessageEncryption();
    const {progress, uploadVideo} = useUploader();
    const [videoUrl, setVideoUrl] = useState("")
    const [messageToSend, setMessageToSend] = useState(null)
    const videoRef = useRef(null)
    const [enableControls, setEnableControls] = useState(false)
    const uplaodFile = async ()=>{
        console.log("file", file)
        const response = await uploadVideo(file)
        console.log("response::",response)
        
    const ENDPOINT = process.env.NODE_ENV == "production" ? process.env.REACT_APP_URL_LIVE : process.env.REACT_APP_URL 
        let videoUrl = `${ENDPOINT}${response.filePath}`
        setMessageToSend({
            ...messageToSend,
            ...message,
            videoUrl
        })
        setVideoUrl(videoUrl)
    }
    const playVideo = ()=> {
        setEnableControls(true);
    }
    useEffect(() => {
        if(!incomming){
            uplaodFile();
        }
        else{
            setVideoUrl(message.videoUrl);
        }
    }, [file, incomming])
    
    useEffect(() => {
        if(progress >= 100){
            
        }
    }, [progress])
    useEffect(() => {
        setMessageToSend({
            ...message,
        })
    }, [message])

    useEffect(() => {
        if(messageToSend && !messageToSend.incomming && messageToSend.videoUrl)    
        {
            window.myChat.socket.emit("sendMessage", encode(messageToSend), ()=>{}); 
        }
    }, [messageToSend])
    useEffect(() => {
        if(enableControls)
        videoRef.current.play();

    }, [enableControls])
    return (
        <div className="w-80 relative overflow-hidden rounded-lg ">
            <video 
                ref={videoRef}
                className="outline-none w-full"
                src={videoUrl}
                poster={file.thumbnail}
                controls={enableControls}
            />
            {
                !enableControls && (progress >= 100 || incomming)  &&
                <div className="flex-center absolute top-0 left-0 w-full h-full theme-transparent-bg cursor-pointer" onClick={playVideo}>
                    <img src={playBtn} className="w-20"/>
                </div>
            }
            { !incomming && progress < 100 && <UploadingLoader progress={progress}/> }
        </div>
    )
}
