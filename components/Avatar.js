import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Avatar({ uid,  onChange }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const [uploadedSuccessfully, setUploadedSuccessfully] = useState()
  const[errorMessage, setErrorMessage] = useState(null)
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onChange(files)   
  }, [files] )


  ///read images into hook
  const inputAvatar = (event) =>{
    const input_array = Array.from(event.target.files)
    const doesExist = input_array.map((file)=> {
      let curr= []
      files.map((prevfile)=>{ if(prevfile.name == file.name){curr.push(true) }else{curr.push(false)}})
      if(curr.includes(true)) {
        return true}
      else{ return false}
    })
    if(doesExist.includes(true)){//if image is already in file
      setErrorMessage("cannot upload same file twice")
      return
    } 

    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);  
    setErrorMessage(null)
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
    setErrorMessage("")
    event.preventDefault()
    console.log("photoso submited")
   

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



  return (
    <div className="bg-neutral text-white p-4  ">
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
      <div className="p-2 border-t border-neutral-500">
        <h1 >Please upload 10-20 images</h1>
        <h1>For the best results possible. The more the better!</h1>
      </div>
      <div >


       {/* <button onClick={uploadAvatar} > Add sample image</button> */}

        <br></br>

        <form className="w" >
          <input type="file" multiple onChange={inputAvatar} className=" w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent" />        
        </form>
    
    </div>

    <div>
      {files.length > 0 && (
        <div className=" flex m-10 flex-wrap justify-around  content-center">
          {files.map((file, index) => (
            <div onClick={() => handleDeleteClick(index)} className="relative max-w-fit hover:opacity-80 hover:rounded-sm hover:cursor-pointer" key={file.name}>
              <img className="relative w-32" src={URL.createObjectURL(file)} alt={file.name} />            
            </div>          
          ))}
         
        </div>
      )}
    </div>

    {/* <div className="flex flex-col items-center space-y-3 m-5">   
        { files.length > 0 &&
        <div className="flex flex-col text-center items-center space-y-2">
          <p>Onces your done uploading your images, please submit your photos</p>
          <button className="btn" onClick={uploadAvatar} >Submit photos</button>
        </div>
        }

       <div className = "text-error">
        {errorMessage && <p>{errorMessage}</p>}
      </div> 
             
      {
        uploading &&  <p>{'Uploading ...' }</p>
      } 
    </div> */}

    <div className="bg-success">
      
    </div>
    {errorMessage && 
    <div class="m-10 z-10">
      <div class="alert alert-error shadow-lg z-auto">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{errorMessage}</span>
        </div>
      </div>
    </div>}
    <div className="mt-5 border-t border-neutral-500"></div>
  </div>
  )
}