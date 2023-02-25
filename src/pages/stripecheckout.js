import {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter ,  } from 'next/router';
import { useState } from 'react';
import { useSession , useSupabaseClient , useUser } from '@supabase/auth-helpers-react';


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
    const session = useSession()
    const router = useRouter();
    const supabase = useSupabaseClient()
    //const user = useUser()

    const {success, canceled} = router.query;
    const [customerID, setCustomerID] = useState(null)

    const customer_email  = session?.user?.email

    // get customer id
    async function getData(){
      const {data, error} =  await supabase
      .from('profiles')
      .select('stripe_customer', 'user_email')
      .eq('user_email', customer_email)
      
      if(data[0] != undefined){setCustomerID(data[0].stripe_customer)}
      if(error){alert('Session unavailable. Refresh the page')} 
      
    }
    getData()
   
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout

    if(success !== undefined || canceled !== undefined){
        if (success) {
            console.log('Order placed! You will receive an email confirmation.');
        } 
        if (canceled) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
          }
    }
   
  }, [success, canceled]);


  //fetch checkout_session
//   const  GetStripeSession= async ()=>{
//     fetch('/api/stripe/checkout_sessions',{
//         method: "POST",
//         body: JSON.stringify({
//             customer_email: "customer_email"
//     })
//     })
//     const res = await response.json()
//     console.log(res)
//   } 

  return (
    <div  className="h-screen flex items-center justify-center">
        <form className="" action='/api/stripe/checkout_sessions' method="POST"  > 
        <input name="email" className='hidden' value={customer_email}></input>
        <input name="stripe_customer" className='hidden' value={customerID}></input>
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
        </div>
  );
}

