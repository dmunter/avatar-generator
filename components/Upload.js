import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import JSZip, { file } from "jszip";
 

export default function Avatar({ uid, url ,size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (url) console.log(url)
  }, [url])



  ///read images into hook
  const inputAvatar = (event) =>{
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    
  } 
  //delete images from hook
  function handleDeleteClick(index){
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  }
  //upload to supabase bucket
  const uploadAvatar = async (event) => {
    event.preventDefault()
    try {
      setUploading(true)
      if (files.length < 1) {
        setUploading(false)
        throw new Error('You must select an image to upload.')      
      }

    const zip = new JSZip();
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push (
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
           // console.log('onload')
            zip.file(files[i].name, event.target.result);
            resolve();
          };
          reader.onerror = (error) => reject(error);
          reader.readAsArrayBuffer(files[i]);
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
      let {  error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(uid, content, { upsert: true })

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
    <div className="m-5 p-5">
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
          {uploading ? 'Uploading ...' : 'upload'}
        </label>

       {/* <button onClick={uploadAvatar} > Add sample image</button> */}

        <br></br>

        <form onSubmit={uploadAvatar}>
          <input type="file" multiple onChange={inputAvatar} />
          <button type="submit">Upload</button>
        </form>
    
    </div>
    <div>
    

      {files.length > 0 && (
        <div>
          {files.map((file, index) => (
            <div key={file.name}>
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <button onClick={() => handleDeleteClick(index)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  )
}