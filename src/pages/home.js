import Account from '../../components/Account'
import {useRouter} from 'next/router'
import { useSession ,useSupabaseClient, useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import Header from '../../components/layout/header'
import Welcome from '../../components/Welcome'
import Router from 'next/router'
import Footer from '../../components/layout/footer'

export default function Home(){
    const [state, setState] = useState(null)
  
    const {isLoading ,supabase, session, error} = useSessionContext()
    const [hasLoggedOut, setHasLoggedOut] = useState('')

    useEffect(()=>{ 
        if(isLoading == false){        
            if(!session){
                console.log(session)
                Router.push('/signin')
            } else {
                setState(true)
            }
        }
    }, [isLoading,session])

    return(
        <div className="container" >
             { !state ? ( 
                      <div className="w-full h-full top-0 bg-base-100 bg-neutral-800 left-0 right-0 bottom-0 absolute flex justify-center align-center items-center ">
            
                      <p>Loading </p>
                      <div className="w-8 pl-2"><img className="relative" src='/animated/loading.svg'></img></div>
                  </div>
           ) : (
            // 
            <div className="container">     
            {/* <div className="bg-black w-100 h-50"> asdf</div> */}
            <Header />   
            <Welcome />                                    
            <Account session ={session} />         
            <Footer/>    
            </div>
      )}
       
        </div>
    )
}

