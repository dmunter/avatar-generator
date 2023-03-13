import {  useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Router from 'next/router'

export default function Header(){
    const supabase = useSupabaseClient()
    const user = useUser()


    const SignOut=()=>{
        supabase.auth.signOut()
        Router.push('/')
    }
    return(
        <div className="flex justify-around bg-neutral border-b border-neutral-600 p-2">
            <div className=" relative flex flex-wrap content-center text-white">
                <h1 className="mr-2">Logged in as:</h1>
                <h1>{user.email.split("@", 1)}</h1>
            </div>
            <div>
                <button className="btn relative btn-neutral p-2" onClick={() => SignOut()}><h1>Sign out</h1></button>
            </div>
        </div>
    )
}