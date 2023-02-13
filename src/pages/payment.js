import 'tailwindcss/tailwind.css'
import { useState } from 'react'
import { useTransition } from 'react'

export default function MakePayment (){
const [text, setText] = useState(null)

function setBody(){
    //setText(setText("text"))
}

async function getRequest(){
    // fetch("/api/payment/create-stripe-customer", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       prompt: "some text",
    //     }),
    //   })
    //   .then((response)=> response.json())
    //   .then((response)=> setText(response))
       
    // let prediction = await response.json();
    // setText(prediction)
    }
    return(
        <div className="bg-white m-auto flex p-10">
            <div className="outline outline-offset-2 outline-blue-500  p-2"> 
                <button className="btn border-1-black" onClick={getRequest}>Send Request</button>           
            </div>
            {text && <p className="m-10">{text}</p>}
        </div>
    )
}