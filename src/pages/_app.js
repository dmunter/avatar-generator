import '../styles/globals.css'
import '../styles/background.css'
import '../styles/stars.css'
import '../styles/formstyles.css'
import 'tailwindcss/tailwind.css'
import { themeChange } from 'theme-change'
import Head from 'next/head'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useEffect } from 'react'
  
import { useState } from 'react'

export default function App({ Component, pageProps }) {


  const [supabase] = useState(()=> createBrowserSupabaseClient())
  return(
    <>
    
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
     
      <Component {...pageProps} />

    </SessionContextProvider>

    </>
    
 )
}
