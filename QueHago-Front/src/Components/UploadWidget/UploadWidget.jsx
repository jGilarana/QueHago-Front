import { useEffect, useRef, useState } from 'react'

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
        <>
        <div>

        <h1>Holi</h1>
        <img className="profilePhoto" src={url}></img>
        <button onClick={() => widgetRef.current.open()}>Upload</button> 
        </div>
        </>
    )
}

export default UploadWidget