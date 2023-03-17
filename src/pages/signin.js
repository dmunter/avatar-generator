import { useSession ,useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Router from 'next/router'
import Image from 'next/image'
export default  function  SignIn() {
  const session  =  useSession()
  const supabase = useSupabaseClient()

  const Redirect=()=>{
    Router.push('/success')
  }
  const redirectToIndex=()=>{
    Router.push('/')
  }
  console.log(session)
  return (
    <div className="sign-in-container bg-black" >
      {!session ? (

<div className='dark:bg-scale-200 bg-scale-100 relative py-2 pb-16 h-screen '>
<div className='sm:py-18 gap container relative mx-auto grid grid-cols-1 px-6  md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20'>
  <div className='relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6 mt-20 md:mt-5 '>
    <div className='relative bg-zinc-900 lg:mx-auto lg:max-w-md rounded-2xl'>
      <div className='container-redshadow rounded-2xl'>
        <div className='border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm '>
          <div className= "flex justify-between wrap-none items-center">
            <button onClick = {redirectToIndex} className='text-scale-1200 text-2xl w-8 h-8 bg-neutral-500 rounded-md'>
                    <Image src='/back-svg.svg' width={100} height={100} alt="back" className="relative fill-white-50" />
            </button>
            <div className="flex wrap-no justify-end items-center space-x-3">
              <h1 className="uppercase text-lg font-semibold">Img-Gen </h1>
              <div className="divider-horizontal divider white"></div>
              <div className="gradient-button w-12 h-12  rounded-md p-1   ">
                  <Image className="absolute w-10" src='/user-circle.svg' width={100} height={100} alt="hero"/>
              </div>                        
            </div>
          </div>
          <div className='mb-6 flex flex-col gap-6'>
            <div className='flex items-center gap-3'>
          
            </div>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  
                  borderRadius: '10px',
                  borderColor: 'rgba(0,0,0,0)',
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: '#A855F7', //set to primary
                    brandAccent: '#2A303C', //set to secondary
                  },
                },
              },
            }}
            providers={['apple', 'google']}
            theme='dark'
          />
        </div>
      </div>
    </div>
  </div>
</div>
</div>
      ) : (
        <Redirect/>
      )}
    </div>
  )
}
