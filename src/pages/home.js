import styles from '@/styles/Home.module.css'
import Account from '../../components/Account'
import Avatar  from '../../components/Upload'
import {useRouter} from 'next/router'

import { useSession ,useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Home(){
    const session = useSession()
    const router = useRouter()
    const Redirect=()=>{
        try{
            router.push('/signin')
        } catch(e){
            console.log(e)
        }
       
      }



    return(
        <div className="container">
             {session ? (
                <Account session ={session} />          
            ) : (
            <Redirect/>
      )}
        </div>
    )
}