import { useEffect, useRef, useState } from 'react'
import './UploadWidget.css'
const UploadWidget = ({url, setUrl}) => {

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect (() => {
        cloudinaryRef.current = window.cloudinary;     
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: 'djpdopxfy',
                uploadPreset: 'cpsku1eh',
                sources: ['local', 'url', 'camera', 'instagram'],
                folder: 'QueHago',
            },
            (error, result) => {
                ;
                if (result.event === "success") {
                    setUrl(result.info.url)
                    console.log('Done! Here is the image info: ', result.info.url);
                }
            }
        ); 
    },[])

    
    return (  
        <div>
         <button onClick={() => widgetRef.current.open()}>Upload</button>
        <img className="profilePhoto" src={url}></img>
        </div>
    )
}

export default UploadWidget