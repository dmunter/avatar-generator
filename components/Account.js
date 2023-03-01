import { useState, useEffect, useCallback } from 'react'
import { useUser, useSupabaseClient ,useSession} from '@supabase/auth-helpers-react'
import Avatar from './Upload'
import Form from './form'
import SubmitModel from './replicatemodel'
import Image from 'next/image'
export default function Account({ session }) {
  const supabase = useSupabaseClient()

  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [formList, setFormList] = useState({gender: '', styles: ''})


  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {

    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, stripe_customer`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
      }


    } catch (error) {
      alert('Error loading user data!')
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
  const getItems = useCallback((data)=>{
    console.log(data)
    setFormList(data)
  },[formList])
  
  return (
    <div className="form-widget bg-white">
      <div>
        <button className="button block m-5" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
      <div className="m-5 p-5">
        <label htmlFor="email">Email</label>
        <br></br>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username"></label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
        
      </div>
      
      {/* <CreateStripeCustomer props = {user} />  */}

      <div>
        {/* <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          
        </button> */}
        {loading ? 'Loading ...' : 'Update'}
      </div>

      

      <div className="form-widget">
        <Avatar
            uid={user.id}
            //url={avatar_url}
            size = {150}           
            onUpload={(url) => {
              //setAvatarUrl(url)
              //updateProfile({ username, website, avatar_url: url })
            }}
          />
        </div>
        <div>
          {/* {avatar_url && 
          <div>
            your images were successfully uploaded!
          </div>  
          } */}
        </div>

        <Form getItems = {getItems}
              
        />
        <SubmitModel formList = {formList}/>
        <Image
        
        src="/animated/blocks.svg"
       height={10}
       width={10}
        alt="Follow us on Twitter"
        />
    </div>
  )
}