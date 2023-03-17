import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { useSession, setUser } from '@supabase/auth-helpers-react'
import Router from 'next/router'

export default function SubmitModel(){

    const session = useSession()
    const supabase = useSupabaseClient()

    const [latestError, setLatestError] = useState('')
    const [currentStatus, setCurrentStatus] = useState('')
    //const [button, setButton] = useState('Submit')
    const [isDone, setIsDone] = useState(false)
    const [isTraining, setIsTraining] = useState(false)
    const [showModal, setShowModal] = useState(false)
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
        console.log(name[0].model_name)
            if(currentStatus=='Training')return
        //console.log(model[0]?.model_status)
           if(model[0]?.completed){
            setIsDone(true)
           }else if(model[0]?.model_status){
            setCurrentStatus('Training')
            setIsTraining(true)
           }
           else if(!name[0]?.started){
            setCurrentStatus('Ready')
           }
        }
        fetch()

    } )
    //console.log(session.user)

    const Submit= async(e)=>{
        e.preventDefault()
        setShowModal(false )
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
            setCurrentStatus('Didnt meat requirements')
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

        await supabase.from('user_models')
        .update({'model_status': res})
        .eq('model_name', res.model)


        if(res.status == "starting" || res.status == "queued"){
            setIsTraining(true)
            setCurrentStatus('Training')
            await supabase.from('profiles')
            .update({'started' : true})
            .eq('model_name', res.model)
        }


    
        //console.log(data)
        
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
        <>
        <div className="gradient-button text-white flex align-center items-center justify-center w-32 h-11 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            <button
            className=" font-bold uppercase text-sm px-6 "
            type="button"
            onClick={() => setShowModal(true)}
            >              
            Submit
            </button>
        </div>
        {showModal ? (
          <>
            <div className="w-screen h-screen fixed inset-0  z-20 backdrop-blur-sm "> </div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl text-neutral-700  font-semibold">
                      Are you sure?
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      Once you start the training proccess there is no going back. The AI model will take 20-40 minutes once you submit to complete the training proccess. We will send you an email once your images are ready.
                    </p>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-error background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <div className="gradient-button text-white flex align-center items-center justify-center w-32 h-11 rounded shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        <button
                        className=" font-bold uppercase text-sm px-6 "
                        type="button"
                        onClick={(e) =>{ Submit(e)}
                        }
                        >              
                        Submit
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    )
    const submitLoading = (
        <>

        </>
    )

    const finished =(
        <div className="m-10 flex flex-col gradient-button h-auto w-auto p-5 rounded-lg justify-center align-center items-center hover:cursor-pointer " onClick={(() => Router.push('/results'))}>
        <h1 className="bold text-2xl font-light ">Your model is finished!</h1>
        <h1 className="bold text-2xl font-bold uppercase">see results </h1>
        </div>
        
    )

return(
    <>
    <div className="pb-16">
        <div className="flex justify-center">
        { 
            currentStatus == 'Ready' &&  <div>{submitReady}</div> 
        }
          
        </div>
        
        <div className="flex flex-col justify-cente items-center align-center">
        {/* {
                    latestError && <p className="bg-error">{latestError}</p>
                } */}
            {
                isTraining &&        
                <div className="flex flex-col items-center text-center">
                    <p>your avatars will be here soon!</p>
                    <p className="text-center items-center">we will send you results when your photos are finshed!</p>
                </div>
            }
                
            {currentStatus=='Loading' ? (
                <div>
                    <img className="realtive w-16"src={'animated/dual_ring_loader.svg'}/>
                </div> ):(
                    <></>
                )
            }
            {
                isDone && <div className="flex ">{finished}</div>
            }

                
            
        </div>
       
        
    </div>

    </>
)
}