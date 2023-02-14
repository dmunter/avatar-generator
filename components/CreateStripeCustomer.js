import initStripe from "stripe";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from "react";

export default  function CreateStripeCustomer(user){
  const [stripeUser, setStripeUser] = useState(null)
  const supabase = useSupabaseClient()
  console.log(user)

  async function asyncCall() {   
    const {data, error} =  await supabase
    .from('profiles')
    .select('stripe_customer')
    .eq('id', user.props)


    if(data[0].stripe_customer == null ){
      const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET)
      const customer =  await stripe.customers.create({
          email: "test2@gmail.com",             
      })
      
      const id = String(customer.id)
      await supabase
      .from('profiles')
      .update({stripe_customer: customer.id})
      .eq('id', userid.props)
      setStripeUser(customer.id)
    }  else { 
      console.log('data not null')
    } 

  }
  useEffect(()=>{
    asyncCall()
  }, [])
  
  return (
    <div>
      <p>some text</p>
    </div>
  )
}





