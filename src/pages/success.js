import { useSession ,useSupabaseClient , useSessionContext } from '@supabase/auth-helpers-react'
import {useState , useEffect} from 'react'
import PreviewPage from './stripecheckout.js'
import Router from 'next/router'

export default function Success(){
    const supabase = useSupabaseClient()
    const { isLoading, session, error } = useSessionContext();
    
    const [paid, setPaid] = useState(false)
    useEffect(()=>{
        //console.log(isLoading)
        const fetch=async()=>{
            const { data } = await supabase
            .from('profiles')
            .select('paid')
            .eq('id', session.user.id)
            setPaid(data[0].paid)
            
            if(data[0].paid == true){
                Router.push('/home')
            } else if(!data[0].paid) {
                Router.push('/stripecheckout')
            }
        }

        if(isLoading == false){
            fetch()
        }
    },[isLoading])

    return(
        <>
            <p>Loading</p>
        </>

    )
}