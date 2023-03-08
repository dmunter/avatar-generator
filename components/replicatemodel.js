import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useSession, setUser } from '@supabase/auth-helpers-react'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function SubmitModel(){

    const session = useSession()
    const supabase = useSupabaseClient()

    const [latestError, setLatestError] = useState('')
    const [currentStatus, setCurrentStatus] = useState('Ready')
    const [button, setButton] = useState('Submit')
    
    const [isTraining, setIsTraining] = useState(false)

    const [prediction, setPrediction] = useState(null);

//check if model is running
    useEffect(()=>{
        const fetch=async ()=>{      
            const {data : name , error:err } = await supabase
            .from('profiles')
            .select('model_name')
            .eq('id', session.user.id )

            const{data: model , error:er} = await supabase
            .from('user_models')
            .select('*')
            .eq('model_name', name[0].model_name)
            
            console.log(model[0]?.model_status)
           if(model[0]?.completed){
            setCurrentStatus('Finished')
            setIsTraining(false)}
           else if(model[0]?.model_status){
            setCurrentStatus('Training')
            setIsTraining(true)
           }
        }
        fetch()

    })
    //console.log(session.user)

    const Submit= async(e)=>{
        e.preventDefault()
        setCurrentStatus('Loading')
        
        if(!session){
            setCurrentStatus('Session has expired')
            return
        }
        const id = session.user.id
        
        const { data , error} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        //console.log(data[0].paid)
        if(data[0].instance_url == null || data[0].paid != true ||data[0].model_name == null || data[0].model_status != null){
            alert("error")
            setCurrentStatus('Ready')
            return
        }
        //console.log('not returned')

        //start job
        const response = await fetch('/api/trainreplicate',{
            method: 'POST',
            body: JSON.stringify({
                instance_data: data[0].instance_url,
                model_name: data[0].model_name
            })
        })


        const res = await response.json()
        console.log(res)
        setPrediction(res)

        if(res.status == "starting" || res.status == "queued"){
            setIsTraining(true)
        }


    
        //console.log(data)
        setCurrentStatus('Ready')
    }
    
    //if model is training render this

    // async function running(){
    //     while(
    //         prediction.status !== "succeeded" &&
    //         prediction.status !== "failed"
    //     ){
    //         await sleep(3000)
    //         const response = await fetch('/api/getstatus/' + prediction.id)
    //         const nprediction = await response.json()
    //         if(response.status !==200){
    //             setIsTraining(false)
    //             return <></>
    //         } 
    //         setPredction(nprediction)
    //     }

    // }
     
    const submitReady =(
        <button onClick={(e)=>Submit(e)} className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 border border-blue-700 rounded">
        {button}
        </button>
    )
    const submitLoading = (
        <>
        </>
    )

    const finished =(
        <>
        <h1 className="bold text-2xl text-neutral">Your model is finished!</h1>
        <h1 className="bold text-2xl text-neutral">see results </h1>
        </>
        
    )

return(
    <div>
        <div className="flex justify-center">
        { 
            currentStatus != "Finished" ? currentStatus != 'Ready' ? submitLoading : submitReady : finished
        }
          
        </div>
        {/* {
            latestError && <p className="bg-error">{latestError}</p>
        } */}
        {
            isTraining &&        
            <div className="flex flex-col items-center">
                <p>your avatars will be here soon!</p>
                <p>we will send you results when your photos are finshed!</p>
            </div>
        }
        {/* <p>{currentStatus}</p> */}

    </div>
    
)
}