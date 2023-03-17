import {  useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Router from 'next/router'
import Image from 'next/image'
export default function Header(){
    const supabase = useSupabaseClient()
    const user = useUser()


    const SignOut=()=>{
        supabase.auth.signOut()
        Router.push('/')
    }
    return(
        <div className="flex justify-between bg-neutral border-b border-neutral-600 p-4 pl-8 pr-8">


          <div className= "flex justify-between wrap-none items-center">

            <div className="flex wrap-no justify-end items-center space-x-3">
             <div className="gradient-button w-12 h-12  rounded-md p-1   ">
                  <Image className="absolute w-10" src='/user-circle.svg' width={100} height={100} alt="hero"/>
              </div> 
              <div className="divider-horizontal divider white"></div>
              <h1 className="uppercase text-lg font-semibold">Img-Gen </h1>
            
                       
            </div>
          </div>
        
          <div className=" relative flex flex-wrap content-center items-center text-white">
                <div>
                    <button className="btn relative btn-neutral p-2" onClick={() => SignOut()}><h1>Sign out</h1></button>
                </div>
                {/* <h1 className="font-">{user.email.split("@", 1)}</h1> */}
          </div>


        </div>
    )
}