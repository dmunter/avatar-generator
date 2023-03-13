import {useState} from 'react'
import { womanStyles } from "../../../components/utilites/images"

export default function test(){
const [responseId, setResponseId] = useState()
const [results, setResults] = useState()
const getImage= async()=>{
    const response = await fetch('/api/createimg',{
        method: 'POST',
        body: JSON.stringify({
            message: "body message"
        })
    })
    const resp = await response.json()
    console.log(resp)
    setResponseId(resp)
}
const getstatus= async()=>{
    console.log('button')
    const response = await fetch('/api/createimg',{
        method: 'DELETE',
        body: JSON.stringify({
            message: 'message',
            id: responseId?.url?.get || "https://api.replicate.com/v1/predictions/2bdbgffibrfdlnqffxqdoftx74" ,
        })
    })
    const resp = await response.json()
    setResults(resp)
    console.log(resp)
}  

const woman_keys=[
{id: "1900s.png"}, 
{id: "1950s.png"},
{id: "1976.png"},
{id: "35mm.png"},
{id: "android.png"},
{id: "archer.png"},
{id: "astronaut.png"},
{id: "coldwinter.png"},
{id: "cyberpunk.png"},
{id: "cyborg.png"},
{id: "detective.png"},
{id: "elf.png"},
{id: "harrypotter.png"},
{id: "hobbit.png"},
{id: "humanoid.png"},
{id: "jedi.png"},
{id: "muscles.png"},
{id: "norweigen.png"},
{id: "oil painting.png"},
{id: "pencil.png"},
{id: "pirate.png"},
{id: "plant god.png"},
{id: "robot.png"},
{id: "viking.png"},
{id: "warrior.png"},
{id: "witch.png"},
{id: "zombie.png"},
]




// const woman_imageKeys = Object.keys(womanStyles).slice(Object.keys(womanStyles).length/2 );



    return(

        <div className="flex justify-center align-center items-center m-10">
            <button className="btn" onClick={()=>getImage()}>Fetch image</button>
            <button className="btn" onClick={()=>getstatus()}>get status</button>
            {responseId && <p>{responseId.id}</p>}
            {results &&
            <>
            <p>{}</p>
            <img className='relative' src={results.output[0]}></img>
            </>}
            
        </div>
    )
}