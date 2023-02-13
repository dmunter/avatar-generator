import { useSession ,useSupabaseClient } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Router from 'next/router'

export default  function  SignIn() {
  const session  =  useSession()
  const supabase = useSupabaseClient()

  const Redirect=()=>{
    Router.push('/home')
  }
  const redirectToIndex=()=>{
    Router.push('/')
  }
  return (
    <div className="sign-in-container" style={{ padding: '50px 0 100px 0', width: "50%", margin: 'auto' }}>
        <button onClick = {redirectToIndex}> Back to index.js</button>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <Redirect/>
      )}
    </div>
  )
}
