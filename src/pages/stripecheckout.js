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
   
    
   //create a stripe id
    

  //check if user hase paid and if has a stripe account 
    useEffect(()=>{
      const getUser=async()=>{
        const {data: userData} = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        

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
        }


        setCustomerEmail(session.user.email)

        if(userData[0].paid ==true){
          Router.push('/home')
        }   
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


  return (
    <div  className="h-screen flex items-center justify-center">
      { !hasRedirect &&
      <form className="" action='/api/stripe/checkout_sessions' method="POST"  > 
      <label for ="email"></label>
      <input name="email" className='hidden' defaultValue={customerEmail}></input>
      
      <button 
              className="m-auto relative bg-white block rounded-xl border border-gray-100 p-8 shadow-xl"
                
              > 
              <span
                  className="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
              >
                  $13.99
              </span>

              <div className="mt-4 text-gray-500 ">
                  <h3 className="mt-4 text-xl font-extrabold text-3xl font-bold text-gray-900">What do you get?</h3>

                  <div className="mt-2 text-sm sm:block p-5">
                      <ul>
                          <li>✨ 100+ custom photos</li>
                          <li>✨ 4k photo realistic images</li>
                          <li>✨ 20+ different styles to chose from</li>
                          
                      </ul>
                  </div>
                  
              </div>
              <div className="rounded-full leading-10 min-h-25 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                  Get images 
              </div>
      </button>
      
        </form> 
      }
       
        </div>
  );
}

