import {useEffect} from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PreviewPage() {
    const router = useRouter();
    const {success, canceled} = router.query;


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

  return (
    <div  className="h-screen flex items-center justify-center">
        <form className="" action="/api/stripe/checkout_sessions" method="POST">
        <button
                class="m-auto relative bg-white block rounded-xl border border-gray-100 p-8 shadow-xl"
                href=""
                >
                <span
                    class="absolute right-4 top-4 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-600"
                >
                    $13.99
                </span>

                <div class="mt-4 text-gray-500 ">
                    <h3 class="mt-4 text-xl font-extrabold text-3xl font-bold text-gray-900">What do you get?</h3>

                    <p class="mt-2 text-sm sm:block p-5">
                        <ul>
                            <li>✨ 100+ custom photos</li>
                            <li>✨ 4k photo realistic images</li>
                            <li>✨ 20+ different styles to chose from</li>
                            
                        </ul>
                    </p>
                    
                </div>
                <div className="rounded-full leading-10 min-h-25 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
                    Get images 
                </div>
        </button>
        
        </form>
        </div>
  );
}

