// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import initStripe from "stripe";
//import { supabase } from "../../../utils/supabase"
 import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function  handler(req, res) {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })
  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser()

  //console.log(user)

  const { email } = await JSON.parse(req.body)

  
  console.log(email)

  const stripe = initStripe(process.env.STRIPE_SECRET_PROD)
  const customer = await stripe.customers.create({
    email: email,
  })
  
  await supabaseServerClient.from('profiles')
  .update({'stripe_customer': customer.id})
  .eq('id', user.id)


  if(customer.email){
    // if(false){
    res.status(200).json({message: `stripe customer create: ${customer.id}`, stripe_customer: customer.id })
  } 
  else {
    res.json({error: 'there was an error'})
  }
}



