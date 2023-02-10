import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import JSZip, { file } from "jszip";

export default function Avatar({ uid, url,size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState([])
  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])


  ///read images into hook
  const inputAvatar = (event) =>{
    console.log(event.target.files)
    const newFile = event.target.files[0]
    setSelectedFiles(()=> [...selectedFiles, newFile]);
    setImgSrc(()=>[...imgSrc, URL.createObjectURL(newFile)])
    //console.log(imgSrc)
  } 

  const uploadAvatar = async (event) => {
    event.preventDefault()
    try {
      setUploading(true)
      if (!selectedFiles) {
        throw new Error('You must select an image to upload.')
      }

    const zip = new JSZip();
    const promises = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      promises.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            zip.file(selectedFiles[i].name, event.target.result);
            resolve();
          };
          reader.onerror = (error) => reject(error);
          reader.readAsArrayBuffer(selectedFiles[i]);
        })
      );
    }

    try{ 
      await Promise.all(promises)
      const content = await zip.generateAsync({ type: "blob" });
      //const fileName = `${uid}.${(Math.random()*100000).toString().split('.')[0]}`
      const fileName = `${uid}`+ "data.zip"
      const filePath = `${fileName}`
      onUpload(filePath)
      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, content, { upsert: true })

      if (uploadError) {
        throw uploadError
      }
//selectedFiles.map((file) => URL.createObjectURL(file))
    } 
    ////////////////////////////////////
    

      //const file = event.target.files[0]
      //const fileExt = file.name.split('.').pop()
      //const fileName = `${uid}.${fileExt}`
      //const filePath = `${fileName}`

      // let { error: uploadError } = await supabase.storage
      //   .from('avatars')
      //   .upload(filePath, file, { upsert: true })

      // if (uploadError) {
      //   throw uploadError
      // }

      // onUpload(filePath)
     catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
    
  } catch(e){console.log(e)}
}

  return (
    <div>
      {/* {avatarUrl ? (
        // <img
        //   src={avatarUrl}
        //   alt="Avatar"
        //   className="avatar image"
        //   style={{ height: size, width: size }}
        // />
        <div></div>
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )} */}
      <div style={{ width: size }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>

        <button onClick={uploadAvatar} > upload avatar to database</button>

        <br></br>
        <input style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*" 
          onChange={inputAvatar} 
          /> 
    
    </div>
    <div>
      {selectedFiles &&  
        <p>Files selected: {selectedFiles.length}</p>
      }
      { imgSrc ? (
       <div>
          {imgSrc.map((img)=> {
            return <div key={img}>
              <img src={img} 
              alt="img"
              
              style={{ height: size, width: size }}/>
              {console.log(img)}
            </div>
          })}
      </div>
 
      ) :  (
        <div>insert imagges</div>
      )}
    </div>
    </div>
  )
}