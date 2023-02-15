// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import initStripe from "stripe";
 
 
export default async function  handler(req, res) {

  const stripe = initStripe(process.env.STRIPE_SECRET)
  const customer = await stripe.customers.create({
    email: req.body.email,
  })
  
  const resp = await customer
  console.log(resp)

  if(customer.email){
    res.status(200).json({message: `stripe customer create: ${customer.id}`, stripeID: stripe.id })
  } 
  else {
    res.json({error: 'there was an error'})
  }
  
  
}










  //test placeholder json
  // try{
  //   const response = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
  //     method: 'GET'
  //   })
  //   const response1= await response.json()

  //   res.status(200).json((response1))
  //   return
  // } catch (e){
  //   console.log(e)
  // }



  //-----------------------