

export default function Welcome(){

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

            <div className="text-neutral-100 p-2">
                <div className="text-lg leading-7">
                    <h1>A few things before we start</h1>
                </div>
                <ul className="p-5 space-y-2">
                    <li className="border-b" ><p>Your photo should <span className="underline" >NOT</span> include multiple people. This will confuse the AI and 
                    could ruin the whole proccess. </p></li>
                    <li className="border-b"><p>Upload <span className="italic inline bold">high quality</span> photos that are well lit </p></li>
                    <li className="border-b" ><p>inlude a variety of images with different backgrounds and different outfits</p></li>
                    <li className="border-b"><p>do not use the same photo twice</p></li>
                </ul>
                
                
            </div>
                
            
            <div className="">
                <div className="flex text-neutral text-md justify-center m-2 ">
                    <div className="flex text-center bg-neutral-200 p-4   rounded-sm flex-col w-auto">
                        <h1>Remember... these are the type of photos your aiming for</h1>
                    </div>
                </div>
                <div className="flex justify-around p-1">
                    <div className="p-1 bg-white  rounded-xl" ><img src="/ben_yes.png" className="relative" /></div>
                    <div className= "p-1 bg-white rounded-xl"> < img className="" src="/ben_no.png" className="relative "/></div>
                </div>
            </div>

        </div>

    )
}