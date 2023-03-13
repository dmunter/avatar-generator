import { useState, useEffect, useCallback } from 'react'
import { useUser, useSupabaseClient ,useSession} from '@supabase/auth-helpers-react'

import Customize  from './Customize'



export default function Account({ session }) {
  const supabase = useSupabaseClient()

  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  const [formList, setFormList] = useState({gender: '', styles: ''})
  
  const getItems = useCallback((data)=>{
      console.log(data)
      setFormList(data)
    },[formList])



  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`user_email`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }


    } catch (error) {
      alert(error)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  // async function updateProfile({ username, website, avatar_url }) {
  //   try {
  //     setLoading(true)
  //     const updates = {
  //       id: user.id,
  //       username,
  //       website,
  //       avatar_url,
  //       updated_at: new Date().toISOString(),
  //     }

  //     let { error } = await supabase.from('profiles').upsert(updates)
  //     if (error) throw error
  //     alert('Profile updated!')
  //   } catch (error) {
  //     alert('Error updating the data!')
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }
  
  //get form data from form.js

  
  return (
    <div className="form-widget bg-white">  
      <Customize />
    </div>
  )
}