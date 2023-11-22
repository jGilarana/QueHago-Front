import { useEffect, useRef } from 'react'

const UploadWidget = () => {

    const cloudinaryRef = useRef()
    const widgetRef = useRef()

    useEffect (() => {
        cloudinaryRef.current = window.cloudinary
        
        widgetRef.current.createUploadWidget(
            {
                cloudName: 'djpdopxfy',
                uploadPreset: 'cpsku1eh'
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info.url);
                }
            }
        );
    },[])
    return (
        <>
        <h1>Upload</h1>
        <button onClick={widgetRef.current.open()}>Upload</button>
        </>
    )
}

export default UploadWidget