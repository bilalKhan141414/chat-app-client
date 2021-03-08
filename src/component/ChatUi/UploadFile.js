import React, {useRef, useState, useEffect} from 'react'
import AttachmentIcon from './../../assets/paperclip.svg';
import useVideoThumbnail from '../../shared/custom-hooks/useVideoThumbnail';

export default function UploadFile({handleFileUpload, showUploadedFileThumbnail}) {
    const inputFileRef = useRef(null)
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
    
    const {
        thumbnail, 
        ThumbnailContainer
    } = useVideoThumbnail();

    const handleOnClick = (e) => {
        setUploadedFileName("")
        setUploadedFileName(null)
       inputFileRef.current.click();
    }
    const handleChange = async (event) => {
        if(event.target.files.length > 0 )
        {
            setUploadedFile(event.target.files[0]);
            setUploadedFileName(event.target.value)
            if(thumbnail)
            handleFileUpload({video:event.target.files[0], thumbnail});
        }
    }
    useEffect(() => {
        if(thumbnail){
            console.log("Thumbnail::", thumbnail)
            handleFileUpload({video:uploadedFile, thumbnail});
            showUploadedFileThumbnail(thumbnail)
        }
    }, [thumbnail, uploadedFile])
    return (
        <div className="uploadFile cursor-pointer flex justify-center items-center h-full px-5" onClick={handleOnClick}>
            <img src={AttachmentIcon} className="w-5"/>
            <input
                ref={inputFileRef} 
                type="file" 
                value={uploadedFileName}
                className="hidden" 
                onChange={handleChange}
            />
            {
                ThumbnailContainer(uploadedFile)
            }
        </div>
    )
}
