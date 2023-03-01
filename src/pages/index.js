import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import { useState } from 'react'
import images from '../../components/utilites/images';

export default function Home() {
  const imageKeys = Object.keys(images);
  const [isImageReady, setIsImageReady] = useState()

  const handleImageLoad=()=>{
      setIsImageReady(true)
  }
  


  return (
<div className="container"> 
      <div className="halie-container">   
        <div className="stars"></div>   
        <div className="twinkling"></div>
        <div className="container-shadow"></div>
        <div className="halie-background1"></div>
        <div className="halie-background2"></div>
        <div className="halie-background3"></div>
        <div className="halie-background4"></div>          
      </div>

      <div className="showcase m-w-fit font-bold text-white text-center">
          <div className="... ring  bg-black/30 ring-blue-500 ring-offset-3 rounded-md text-6xl leading-normal">
            <h1 className="">Create your own </h1>
            <h2 className="uppercase decoration-blue-500 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">picture perfect</h2>
            <h1 className="">AI avatars</h1>
            <div className="text-lg leading-7">
              <p>As seen on tik tok! 📱</p>
              <p>Receive 100+ photos of yourself as an AI generated image 🖼️</p>
              <p>Your privacy is important. Your data is never shared! 🤫 </p>
            </div>
          </div>      
      </div>

      <div className="showcase-end flex pb-0 flex-col justify-self-center items-center border border-gray-700 bg-neutral p-5  shadow-lg ...">

        <div className="flex flex-wrap  items-center space-x-2 space-y-2 justify-evenly ">
          <div className="m-auto min-w-fit p-5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-1/4 rounded-lg text-center ...">
          <Link className="text-3xl  margin-10   text-white font-bold text-center ... " href='/signin'> <div className="">  Create AI avatars now  </div></Link>
          </div>
          <buton className="btn m-auto w-15  border text-center  border-gray-700 sel"> Create account  </buton>
        </div>
        
        
        <div className="">
          <div className="flex space-x-2 h-5  p-5 ">
            <img className="h4 relative h-3 w-auto" src="/paymenticons/credit_card.svg" />
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-paypal.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-apple.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-grab-pay.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-giropay.svg"/>         
          </div>
          <div className="flex h-10 "><p className="italic text-sm">one time payment. no subscription</p></div>    
        </div>
      
      </div>

      <div className="bg-neutral flex flex-wrap justify-around border border-gray-700 flex-wrap p-10 relative mt-20  z-10 shadow-2xl  ...">

      <div className="card w-96 m-4 bg-base-100  shadow-xl shadow-xl">
          <div className="h-32 w-32 m-auto mt-5 relative">
            <Image src="/animated/radio.svg" layout="fill" alt="Shoes" className="rounded-xl" />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title  text-neutral">Upload</h2>
            <p className="text-neutral">Upload 10-20 images for AI to train a model on your face!</p>
 
          </div>
        </div>

        <div className="card w-96 m-4 bg-base-100 shadow-xl">
          <div className="h-32 w-32 m-auto mt-5 relative">
            <Image src="/animated/profileicon.svg" layout="fill" alt="Shoes"  />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title  text-neutral">Select</h2>
            <p className="text-neutral">Select from over 30 unique styles to chose from!</p>
 
          </div>
        </div>
        <div className="card w-96 m-4 bg-base-100 shadow-xl">
          <div className="h-32 w-32 m-auto mt-5 relative">
            <Image src="/animated/blocks.svg" layout="fill" alt="Shoes" className="rounded-xl" />
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-neutral">Wait</h2>
            <p className="text-neutral">Let the AI do its work! it can take 20-30 minutes to do all that fancy AI stuff</p>
 
          </div>
        </div>
      </div>
    

    <div className="width-100 bg-neutral p-3">
      <div className="flex  justify-around flex-wrap z-10 m-2 ">
        {imageKeys.map(key => {
        if(key.length < 20){
          return
        }else{
            return(
            <div key={key}className="h-48 w-48 m-5 border flex-shrink border-gray-700 bg-accent rounded-md" >
              <p className="p-1 italic text-neutral">{key.slice(26,-4)}</p>
              <div className="text-center"> {!isImageReady && 'loading image...'}</div>
              <Image className="relative rounded-md hover:brightness-75" onLoadingComplete={()=> handleImageLoad()}  src={key.substring(6)} loading="lazy" unoptimized={true}  width={150} height={100} alt="image"/>
              <p>{}</p>
            </div>)
          }       
        })}
      </div>
    </div>
  
    <div className="bg-neutral">
        <div className="flex flex-col justify-center items-center border border-gray-700 shadow-2xl">
            <h1 className="text-textwhite text-center  m-2 font-bold text-3xl">What type of photos should i upload?</h1>
            <p className="text-textwhite text-center p-5 "> We recommend 10 close-ups, 3 side profiles, 5 chest-up and 3 full body shots. Variety is key: facial expressions, locations, backgrounds and perspectives should all be different. Look away from the camera too. High quality photos work best; minimal makeup is advised as it may be exaggerated in the photos. No nudes, swimwear/underwear is OK.</p>
        </div>
    </div>
    <div>
        <div className="flex flex-wrap bg-neutral justify-evenly items-center flex-grow border border-gray-700">
          <img className="relative rounded-2xl m-4 ml-1 mr-1" src='/benyes.png'/>
          <img className="relative rounded-2xl m-4 ml-1 mr-1" src='/benno.png'/> 
        </div>
    </div>


<div className="bg-neutral border border-gray-700 p-10">
      <div className="explain m-auto p-15 w-2/3 bg-neutral border border-gray-700  ">
        <div className="container p-4 text-white ">
          <h3 className="text-2xl leading-normal ">Whats actually going on?</h3>
          <p> Dreambooth is an open-source deep learning generation model used to fine-tune artifical intelligence imaging models and was developed by researchers like Nataniel Ruiz from Google Research and Boston University in 2022. It lets us teach artificial intelligence imaging models who you are by training it on your photos and then generate any image in any style you want with you in it!
          The artificial intelligence imaging model we use is called Stable Diffusion, created by many researchers at LMU University in Munich and RunwayML, supported by Emad Mostaque and others at Stability AI. </p>
          </div>
      </div>
</div>

      
      
<footer className="footer p-10 bg-neutral text-neutral-content">
  <div>
    <span className="footer-title">Services</span> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </div> 
  <div>
    <span className="footer-title">Company</span> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </div> 
  <div>
    <span className="footer-title">Legal</span> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </div>
</footer>
    

</div>
)
}
