// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


export default async function  handler(req, res) {

  const supabase = createClient()

  const stripe = initStripe(process.env.STRIPE_SECRET)

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  })


  res.send({message: `stripe customer create: ${customer.id}` })
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