import {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter ,  } from 'next/router';
import { useState } from 'react';
import { useSession , useSupabaseClient ,useSessionContext, useUser } from '@supabase/auth-helpers-react';
import Router from 'next/router'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
    //const session = useSession()
    const router = useRouter();
    const { isLoading, session, error } = useSessionContext();
    const supabase = useSupabaseClient()
    //const user = useUser()

    const {success, canceled} = router.query;
    const [customerEmail, setCustomerEmail] = useState()

    const [hasRedirect, setHasRedirected] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    
   //create a stripe id
    

  //check if user hase paid and if has a stripe account 
    useEffect(()=>{
      const getUser=async()=>{
        const {data: userData} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)

        try{
        if(!userData[0]?.stripe_customer?.length){
          console.log(userData[0])
          const request = await fetch('/api/stripe/create-stripe-customer',{
              method: 'POST',
              body: JSON.stringify({
                  email: userData[0].user_email
              })
          })
          const result = await request.json()         
          console.log(result)
        }} catch (error){
          console.log(e)
        }


        setCustomerEmail(session.user.email)

        if(userData[0].paid ==true){
          Router.push('/home')
        }  
        setIsFetching(false) 
      }

      if(isLoading!=true){
        getUser()
      }

    }, [isLoading])

   
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    if(success !== undefined || canceled !== undefined){
        if (success) {
          setHasRedirected(true)
          const updatePaid=async()=>{
            const {data: haspaid} = await supabase
              .from('profiles')
              .update({'paid': true})
              .eq('id', session.user.id)
              Router.push('/home')
              console.log('Order placed! You will receive an email confirmation.');         
        }
        updatePaid()
      
      } if (canceled) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
          }
    }
   
  }, [success, canceled]);
const getStripe=async()=>{
  const response = await fetch('/api/stripe/checkout_sessions', {
    method: 'POST',
     body: JSON.stringify({email: customerEmail })
  })
  const resp = await response.json()
  if(resp.url){Router.push()}
}

  return (
    <div  className="h-screen flex items-center justify-center">
      { !hasRedirect &&
      <div>
              <div 
                className="m-auto relative  bg-white block rounded-xl border border-gray-100 p-8 shadow-xl"> 
                <span className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600">
                    $13.99
                </span>

                <div className="mt-1 text-gray-500 ">
                  <div className="flex justify-center">
                    <h3 className="mt-4 text-xl font-extrabold text-3xl font-bold text-gray-900">What do you get?</h3>
                  </div>
                    <div className=" text-sm sm:block p-5">
                        <ul>
                            <li>✨ 100+ custom photos</li>
                            <li>✨ 4k photo realistic images</li>
                            <li>✨ 20+ different styles to chose from</li>
                            
                        </ul>
                    </div>
                    
                </div>
                <div className="flex justify-center">
                  {!isFetching ? ( 
                  <form method="POST" action="/api/stripe/checkout_sessions" className="flex justify-center rounded-full gradient-button w-48 leading-10 h-10 ">
                            <label htmlfor ="email"></label>
                            <input name="email" className='hidden' defaultValue={customerEmail}></input>
                            <button className="text-neutral-100 bold uppercase font-semibold pr-10 pl-10" type="submit">Get Images</button>
                  </form>
                  ) : (
                    <button className="rounded-full gradient-button text-neutral-100 bold uppercase font-semibold w-48 leading-10 h-10 flex justify-center" >
                      <img className="relative z-10 h-10 w-10" src='/animated/loading.svg'/>
                    </button>
                  )}
                </div>

              </div>    
        </div> 
      }
       
        </div>
  );
}

