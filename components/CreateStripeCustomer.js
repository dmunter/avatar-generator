import initStripe from "stripe";
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from "react";

export default  function CreateStripeCustomer(userid){
  const [stripeUser, setStripeUser] = useState(null)
  const supabase = useSupabaseClient()

  async function asyncCall() {   
    const {data, error} =  await supabase
    .from('profiles')
    .select('stripe_customer')
    .eq('id', userid.props)
    console.log(data[0].stripe_customer)

    if(data[0].stripe_customer == null){
      const stripe = initStripe(process.env.NEXT_PUBLIC_STRIPE_SECRET)
      const customer =  await stripe.customers.create({
          email: "test4@gmail.com",             
      })
      
      const id = String(customer.id)
      await supabase
      .from('profiles')
      .update({stripe_customer: customer.id})
      .eq('id', userid.props)
    }  else { 
      console.log('data not null')
    } 

  }

  asyncCall()
  return (
    <div>
      <p>some text</p>
    </div>
  )
}





