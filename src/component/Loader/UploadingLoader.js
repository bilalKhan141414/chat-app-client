import React from 'react'
import './styles.scss';
export default function UploadingLoader({
    progress
}) {
    console.log("progress from uploading", progress)
    return (
        <div className="absolute top-0 left-0 flex justify-center items-center block w-full h-full uploadLoader">
            <div className="loaderSize relative">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="" height="" viewBox="0 0 120 120" preserveAspectRatio="xMinYMin meet">
                    <circle cx="50%" cy="50%" r="50"></circle>
                    <circle cx="50%" cy="50%" r="50" style={{'stroke-dashoffset':(320 - (3.2 * progress))}}></circle>
                </svg>
                <span className="absolute top-0 left-0 text-white loaderText">{progress}%</span>
            </div>
        </div>
        
    )
}
