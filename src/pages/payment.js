import 'tailwindcss/tailwind.css'
import { useState, useEffect, useMountEffect } from 'react'
import { useTransition } from 'react'
import { useSupabaseClient, useUser ,useSession} from '@supabase/auth-helpers-react'
import Router from 'next/router'
//import PaymentComponent from '../../components/paymentComponent'

export default function MakePayment (){
const [text, setText] = useState(null)
const supabase = useSupabaseClient()
const user = useUser()
const session = useSession()

const Redirect=()=>{
  try{
      Router.push('/signin')
  } catch(e){
      console.log(e)
  }      
}

async function getRequest(){
    
    const {data, error, status} = await supabase
    .from('profiles')
    .select(`username, stripe_customer, avatar_url`)
    .eq('id', user.id)
    .single()

    setText(data.stripe_customer)
    if(error){console.log(error)}
    if(data.stripe_customer != null ){
      console.log("data.stripe customer "+ data.stripe_customer)
      return  
    } else {
        try{
        console.log('data.stripe_customer == null')
        const response = await fetch("/api/stripe/create-stripe-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: `${user.user_email}`,
          }),
        })
      
      const customer = await response.json()

      await supabase
      .from('profiles')
      .update({stripe_customer: customer.stripeID})
      .eq('id', user.id)

      

      } catch (e) {
        alert(e)
      }
    }
   
    }
    //use this in development
    useEffect(()=>{
      if(session)getRequest()
    },session)


    //getRequest() //use this in production
    return(
      <>        
            <div className="bg-white m-auto flex p-10">
                <div className="outline outline-offset-2 outline-blue-500  p-2"> 
                    <button className="btn border-1-black" onClick={getRequest}>Send Request</button>           
                </div>
                {text && <p className="m-10">{text}</p>}              
            </div>        
            {/* <PaymentComponent/>                     */}
      </>
        
    )
}