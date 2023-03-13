import Skeleton from "./utilites/skeleton"
import Image from 'next/image'
import {useState} from 'react'
export default function Welcome(){
    const [isLoading, setIsloading] = useState(true)
    const handleImageLoad =()=>{
        setIsloading(false)
    }

    return(
        <div className="bg-neutral">
            

            <div className="overflow-hidden relative ">
                <div className="stars t"></div>   
                <div className="twinkling"></div>
                <div className="bg-black/30  p-5">
                    <h1 className="text-6xl leading-normal  ">Welcome to Imggen</h1>
                    <h2 className="italic text-lg">Thank you for your purchase!</h2>             
                </div>
            </div>

            <div className="text-neutral-100 p-5">
                <div className="text-lg leading-7">
                    <h1>A few things before we start</h1>
                </div>
                <ul className="p-5 space-y-2">
                    <li className="border-b border-neutral-600" ><p>Your photo should <span className="underline" >NOT</span> include multiple people. This will confuse the AI and 
                    could ruin the whole proccess. </p></li>
                    <li className="border-b border-neutral-600"><p>Upload <span className="italic inline bold">high quality</span> photos that are well lit </p></li>
                    <li className="border-b border-neutral-600" ><p>Inlude a variety of images with different backgrounds and different outfits</p></li>
                    <li className="border-b border-neutral-600"><p>Do not use the same photo twice</p></li>
                </ul>
                
                
            </div>
                
            
            <div className="">
                <div className="flex text-neutral text-md justify-center m-2 ">
                    <div className="flex text-center p-4    flex-col w-auto">
                        <div className="text-neutral-100 font-bold p-4 tracking-wider flex-col w-auto  "> Remember, these are the type of photos your looking for</div>
                    </div>
                </div>
                
                    {isLoading && 
                    <div className="flex justify-around w-50 h-50">
                      <div className=" rounded-xl" ><img className="rounded-xl relative" src={'animated/skeleton.svg'}/></div>
                      <div className= " rounded-xl"><img className="rounded-xl relative" src={'animated/skeleton.svg'}/></div>                  
                    </div>
                    }   
                    <div className="flex justify-around p-1">
                        <div className="p-1 bg-white lg:m-4 md:m-2 sm:m-1 rounded-xl" ><Image src="/ben_yes.png" height={50} width={50} alt="ben_yes" onLoadingComplete={()=> handleImageLoad()}  loading="lazy" unoptimized={true}   className="relative" /></div>
                        <div className= "p-1 bg-white lg:m-4 md:m-2 sm:m-1 rounded-xl"> < Image  src="/ben_no.png" height={50} width={50} alt="ben_no" onLoadingComplete={()=> handleImageLoad()} loading="lazy" unoptimized={true}   className="relative "/></div>
                    </div>
                    
                
            </div>

        </div>

    )
}