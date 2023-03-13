import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import {useEffect, useState} from 'react'
import Image from 'next/image'


export default function results(){
const {isLoading, error , session} = useSessionContext()
const supabase = useSupabaseClient()

const [images, setImages] = useState(null)

useEffect(()=>{
    const getData= async()=>{
        const {data: user} = await supabase
        .from('profiles')
        .select('model_name')
        .eq('id', session.user.id)

        const {data: urls} = await supabase
        .from('user_models')
        .select('prediction_urls')
        .eq('model_name', user[0].model_name)      

        if(urls[0].prediction_urls.length >1){
            console.log('asdf')
            setImages(urls[0].prediction_urls)
        }

        console.log(urls[0].prediction_urls)
    }
if(isLoading==false && session){getData()}
},[isLoading])

    return(
        <div className=''>
            {!images && !isLoading ? (
                <div className="text-black">
                    <p>you havn't trained your model yet</p>
                </div> ) :(<></>)
            }
            <div className="flex flex-row flex-wrap justify-between">
                {images && !isLoading &&
                    images.map((image)=> (
                        <div className="relative w-48 rounded-md" key={image}> 
                            <Image className="relative m-5 rounded-md" src={image} height={150} width={150}   placeholder="blur" blurDataURL="/image-placeholder.png" loading='lazy'/>
                            <p>{console.log(image)}</p>

                        </div>
                    ))
            }
            </div>
            {images && !isLoading ? (
                <div className="flex flex-col justify-center align-center items-center">
                <div className="mb-3">
                    <h1 className="text-neutral">If you would like to have you images emailed to you click here</h1>
                </div>
                <div className="flex justify-center align-center items-center flex-col mb-10">
                    <p>If your images have trouble loading please send me an email </p>
                    <p>dmunter27@gmail.com</p>
                    
                </div>
            </div> 
            ) :(<></>)
            }
      

        </div>
    )
}