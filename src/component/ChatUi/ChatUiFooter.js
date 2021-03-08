import React, {useState} from 'react'
import UploadFile from './UploadFile'
import close from './../../assets/close.svg'
import previewIamge from "./../../assets/Eta.PNG";

export default function ChatUiFooter({
    value,
    onKeyPress,
    onChange,
    handleFileUpload,
}) {
    const [uploadedFilesThumbs, setUploadedFilesThumbs] = useState([]);
    const showUploadedFileThumbnail = (thumb) => {
        console.log("Footer::",thumb)
        setUploadedFilesThumbs((prevState) => ([
            ...prevState,
            thumb
        ]))
    }
    return (
        <div className="bg-gray-100 border-t chat-box-h chat-box-min-h chatBoxFooter flex items-center justify-center relative">
            <div className="uploader-file-preview uploader-file-preview-settings p-5">
                {
                    uploadedFilesThumbs.map((thumb)=>
                    <div className="file-preview file-preview-settings">
                        <div className="absolute closeIcon flex h-full items-center justify-center rounded w-3 w-full">
                            <img src={close} alt="close icon" className="w-5"/>
                        </div>
                        <img src={thumb} className="w-full h-full" alt="previewImg"/>
                    </div>
                    
                    )
                }
                
            </div>
            <div className="inputBox w-full h-full">
                <input 
                placeholder="Write a message..." 
                className=" block focus:outline-none h-full w-full px-5"
                value={value}
                onKeyPress={onKeyPress}
                onChange={onChange}
                />
            </div>
            <div className="actions h-full">
                <UploadFile 
                    handleFileUpload={handleFileUpload}
                    showUploadedFileThumbnail={showUploadedFileThumbnail}
                />
            </div>
        </div>
    )
}
