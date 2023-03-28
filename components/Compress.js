import React, {useState, useRef, useEffect } from 'react'
import Image from 'next/image'
export default function Canvas(props){
    const MAX_WIDTH = 512
    const MAX_HEIGHT= 512
    const {files, rest, onChange, didDelete} = props
    const [compressedUrl, setCompressedUrl] = useState([])

    const canvasRef = useRef(null)

    function calculateSize(img, maxWidth, maxHeight) {
        let width = img.width;
        let height = img.height;
      
        // calculate the width and height, constraining the proportions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
        return [width, height];
      }

    useEffect(() => {
        const compressImage = async() =>{
            //console.log('efsffd')      
        //console.log(files)
        for(let x=0; x<files.length; x++){
          const name = files[x].name
          const fileImage = files[x]

            const canvas = canvasRef.current
            let bitmap =  await createImageBitmap(fileImage);
            //console.log(bitmap)
            const [newWidth, newHeight] = calculateSize(bitmap, MAX_WIDTH, MAX_HEIGHT);
            canvas.width = newWidth;
            canvas.height = newHeight;

            const context = canvas.getContext('2d')
            //Our first draw
            
            //console.log(canvas)
            context.drawImage(bitmap,0,0,newWidth,newHeight)
            let current = canvas.toDataURL("image/png", 1)
           //setCompressedUrl((compressedUrl)=> [...compressedUrl , current] )
            setCompressedUrl((compressedUrl)=>[
              {
                name: name,
                file: current
              }
            ])
        }  
            // console.log(compressedUrl.length)

           // console.log(onChange)
            
           // let compSize = atob(dataUrl.split(",")[1]).length
            //console.log('Compressed Size: ', compSize)
            //console.log(dataUrl)
            //  context.fillStyle = '#000000'
            //context.fillRect(0, 0, context.canvas.width, context.canvas.height)
        }

    console.log(didDelete)    
    if(files.length >0  && !didDelete){
        compressImage()
    }
    }, [files])
    
    useEffect(()=>{
      console.log(compressedUrl)
      onChange(compressedUrl)  
    }, [compressedUrl])

    return (
    <>
    {/* {compressedUrl && 
        <Image src={compressedUrl} width={500} height={500} alt="poix"  className="relative" />
        } */}
        <canvas ref={canvasRef} className='hidden'  {...rest} />

    </>)
}