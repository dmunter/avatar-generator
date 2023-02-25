import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useSession, setUser } from '@supabase/auth-helpers-react'

export default function SubmitModel({formList}){
    const session = useSession()
    const supabase = useSupabaseClient()


    const [currentStatus, setCurrentStatus] = useState('Ready')
    const [button, setButton] = useState('Submit')
    
    const Submit= async()=>{
        setCurrentStatus('loading...')
       
        if(!session){
            setCurrentStatus('Session has expired')
            return
        }
        const id = session.user.id
    
        const { data, error } =  await supabase
        .storage
        .from('avatars')
        .list();
        
        
        if (error) {
            setCurrentStatus(error)
            throw error    
        }

        ///  check user has a zip in storage bucket
        const zipFile = data.filter((obj)=> {
            if(obj.name == id+"data.zip") return obj.name 
        })
        if(zipFile.length < 1){
            setCurrentStatus('No images found in bucket. Please upload images to train the model')
            return
        }
       
        // const res= await fetch('/api/trainreplicate',{
        //     method: 'POST'
        // })
        // const re = await res.json()
        // console.log(re)

        const res= await fetch('/api/trainreplicate',{
            method: 'GET'
        })
        const re = await res.json()
        console.log(re)
        


        //console.log(data)
        setCurrentStatus('Ready')
    }

    useEffect(()=>{
        // console.log("replciatemodel")
    },[])
    
     
    const submitReady =(
        <button onClick={()=>Submit()} className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 border border-blue-700 rounded">
        {button}
        </button>
    )
    const submitLoading = (
        <button className="m-10 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 border border-blue-700 rounded">
        Loading...
        </button>
    )
return(
    <div>
        <div className="flex justify-center">
         {
            currentStatus == 'Ready' ? submitReady : submitLoading
         }            
        </div>
        <p className="p-10">{currentStatus}</p>
    </div>
    
)
}