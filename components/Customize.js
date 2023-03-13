import Avatar from './Avatar'
import Welcome from './Welcome'
import Form from './form'
import SubmitModel from './replicatemodel'
//import submitformavatar from './submitformavatar'
import { useState , useEffect , useCallback} from 'react'
import { useUser, useSupabaseClient ,useSession} from '@supabase/auth-helpers-react'
import JSZip, { file } from "jszip";

export default function Customize(){
const user = useUser()
const [uploading, setUploading] = useState(false)
const  [modelReady, setModelReady] = useState(false)

const [formitems, setFormItems] = useState()
const [avatars, setAvatars] = useState()
const [errorMessage, setErrorMessage]= useState()
const supabase = useSupabaseClient()
const updateForm = useCallback((formitems)=>{
    setFormItems(formitems)
},[formitems])
const updateAvatar= useCallback((files)=>{
    setAvatars(files)
},[avatars])

useEffect(()=>{
    const getData= async ()=> {
    const {data } = await supabase.from('profiles').select('instance_url').eq('id', user.id) 
    if(data[0].instance_url != null ){ setModelReady(true)}}
    getData()
},[user])

 

//submits to avatars and form to supabase
async function submitformavatar(){
    setUploading(true)
    //if Model progress has started. dont let user submit model
    const { data: progression } = await supabase
    .from('profiles')
    .select('started')
    .eq('id', user.id)
    .select()
    if(progression[0].started){
      setUploading(false)
      setErrorMessage("You have already started training a model")
    }

    const user_models = await supabase
    .from('profiles')
    .update({'model_name': "dmunter/"+user.email.replace(/[^a-zA-Z0-9 ]/g, '')+Math.floor(Math.random() * 1000)})
    .eq('id', user.id)
    .select()
    console.log(user_models)

    if (avatars.length < 7) {
        setUploading(false)
        setErrorMessage("You need to upload more than " + avatars.length +" images. We recommend 10-15 images for the best results." )
        return          
    }
    if (formitems.gender < "") {
      setUploading(false)
      setErrorMessage("You need to select a profile!" )
      return          
  }
  if (formitems.styles < 5) {
      setUploading(false)
      setErrorMessage("Select at least 5 styles.  Or select them all!")
      return          
  }


      const zip = new JSZip();
      const promises = [];
      for (let i = 0; i < avatars.length; i++) {
        promises.push (
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
             // console.log('onload')
              zip.file(avatars[i].name, event.target.result);
              resolve();
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(avatars[i]);
          })
        );
      }
      
    await Promise.all(promises)
    const content = await zip.generateAsync({ type: "blob" });
    //const fileName = `${uid}.${(Math.random()*100000).toString().split('.')[0]}`
    //   
    const fileName = `${user.id}`+"-"+ (Math.random()*100000).toString().split('.')[0]
    // const filePath = `${fileName}`
    //onUpload(filePath)
    let {error: uploadError} = await supabase.storage
        .from('avatars')
        .upload(fileName, content, { upsert: true })

    if (uploadError) {
        setUploading(false)
        setErrorMessage('Could not upload images')
        return
    }
        
    //get uploaded url: {publicUrl: url }
    const {data: {publicUrl: url}}   = await supabase
    .storage
    .from('avatars')
    .getPublicUrl(fileName)

    //put url in 
    await supabase
    .from('profiles')
    .update({'instance_url': url})
    .eq('id', user.id)


    //console.log(user_models.data[0].model_name)
    const model_name = user_models.data[0].model_name

    //update supabse form information         
    await supabase
    .from('user_models')
    .update({'styles': formitems.styles})
    .eq('model_name', model_name)
    await supabase
    .from('user_models')
    .update({'gender': formitems.gender})
    .eq('model_name', model_name)
    setUploading(false)
    setModelReady(true)
    setErrorMessage(null)
}
//setModelReady(true)
//console.log(avatars)
return(
    <div className="bg-neutral ">
    <Avatar uid={user.id} onChange={updateAvatar} /> 
    <Form getItems = {updateForm}/>
    <div className="flex justify-center m-2">
    { !uploading ? (
     <button className="btn" onClick ={()=> submitformavatar(avatars, formitems)}>
          Confirm changes
      </button> 
    ) : (
      <button className="btn" >
        Loading... 
      </button> 
    )
    }
    </div>

  {errorMessage && <div class="m-3">
    <div class="alert alert-error shadow-lg ">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{errorMessage}</span>
      </div>
    </div>
    </div>}
   {modelReady && <SubmitModel />}
    </div>
)}