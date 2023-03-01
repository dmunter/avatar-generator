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



  const url = ['string', 'string2']
  const { data, error } = await supabaseServerClient
  .from('user_models')
  .update( {prediction_urls: url})
  .eq('version', '0c9d701f2943566baebaaa630e5bc894dbbc6f07b483a798ffb1ad21982251a5' )
  .select()



//   const { data, error } = await supabaseServerClient
//   .from('user_models')
//   .select('*')
//   .eq('version', '0c9d701f2943566baebaaa630e5bc894dbbc6f07b483a798ffb1ad21982251a5')
// //   .from('female_styles')
//   .select('*')
    console.log(data)
    console.log(error)
    

  //if(error){res.json(error)}
  res.json(data)
  

//   if(customer.email){
//     // if(false){
//     res.status(200).json({message: `stripe customer create: ${customer.id}`, stripe_customer: customer.id })
//   } 
//   else {
//     res.json({error: 'there was an error'})
//   }
}



