import Account from '../../components/Account'
import {useRouter} from 'next/router'
import { useSession ,useSupabaseClient, useUser, useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Header from '../../components/layout/header'
import Welcome from '../../components/Welcome'
import Router from 'next/router'

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
    }, [isLoading])





    return(
        <div className="">
             { !state ? ( 
                    <>Loading..</>
           ) : (
            // 
            <>     
            <Header />   
            <Welcome />                                    
            <Account session ={session} />          
            </>
      )}
       
        </div>
    )
}