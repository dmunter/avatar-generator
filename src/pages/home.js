import Account from '../../components/Account'
import {useRouter} from 'next/router'
import { useSession ,useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
 

export default function Home(){
    const [state, setState] = useState(null)
    const session = useSession()
    const router = useRouter()

    const supabaseClient = useSupabaseClient()
    const user = useUser()

    useEffect(()=>{
        async function loadData(){
            //console.log('load data')
            const { data }   = await supabaseClient.from('profiles').select( 'id , stripe_customer , user_email').eq('id', user.id)
            //console.log(data)

            if(data[0].stripe_customer == null){
                console.log(data[0])
                const request = await fetch('/api/stripe/create-stripe-customer',{
                    method: 'POST',
                    body: JSON.stringify({
                        stripe_customer: data[0].stripe_customer,
                        id: data[0].id,
                        email: data[0].user_email
                    })
                })
                const result = await request.json()
                
                console.log(result)
            }
        }

        if(user) loadData()
    }, [user])


    // const Redirect=()=>{
     
    //     router.push('/signin')
 
    //   }

    const get = async()=>{
        const res= await fetch('/api/trainreplicate')
        const re = await res.json()
        console.log(re)
    }
    return(
        <div className="">
             {session? ( 
                <Account session ={session} />          
           ) : (
            // <Redirect/> 
            <div> </div>
      )}
        <button onClick={()=> get()}>
            Getom some json
        </button>
        </div>
    )
}