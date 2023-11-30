import { useEffect, useRef, useState } from 'react'
import './UploadWidget.css'
import { Button } from '@mui/material'
const UploadWidget = ({updatePhoto, setUrl}) => {

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
               
                if (result.event === "success") {
                    setUrl(result.info.url)

                    const token = localStorage.getItem('token');

                    if (token) {
                        console.log(result)
                      updatePhoto(result.info.url);
                    } else {
                      console.log('Ya puedes ir creando la función');
                    }
                }
            }
        ); 
    },[])

    
    return (  
        <div>
         <Button sx={{backgroundColor:'#4d425f', margin:'1vw'}} onClick={() => widgetRef.current.open()}>SUBIR FOTO</Button>       
        </div>
    )
}

export default UploadWidget