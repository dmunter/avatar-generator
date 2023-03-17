import Link from 'next/link'
import 'tailwindcss/tailwind.css'
import Image from 'next/image'
import { useState } from 'react'
import {images} from '../../components/utilites/images';
import Footer from '../../components/layout/footer';
import Skeleton from  '../../components/utilites/skeleton';

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
      <div className="background-extended "></div>

      <div className=" m-w-fit font-bold text-white text-center showcase ">
          <div className="... ring  bg-black/30 ring-blue-500 ring-offset-3 rounded-md text-6xl leading-normal">
            <h1 className="">Create your own </h1>
            <h2 className="uppercase decoration-blue-500 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">picture perfect</h2>
            <h1 className="">AI avatars</h1>
            <div className="text-lg leading-7">
              <p>As seen on tik tok! 📱</p>
              <p>Receive 100+ photos of yourself as an AI generated image 🖼️</p>
              <p>Your privacy is important. Your data is never shared! 🤫 </p>
              <p>Chose between 50+ different styles 👗</p>
              <p>Receive photos to show off on social media! 📷</p>
              <br></br>
            </div>
          </div>      
      </div>
{/* <Link className="text-3xl  margin-10   text-white font-bold text-center ... " href='/signin'> <div className="">  Create AI avatars now  </div></Link> */}
      <div className="showcase-end flex pb-0 flex-col justify-self-center items-center border border-gray-700 bg-neutral p-5  shadow-lg ...">

        <div className="flex flex-wrap  items-center space-x-2 space-y-2 justify-evenly ">
        <Link className=" font-bold uppercase text-white "  href='/signin'>
            <div className="m-auto min-w-fit p-5 gradient-button  hover:brightness-75  h-auto w-1/4 rounded-lg text-center focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ...">
              <div className="">  Create AI avatars now  </div>
              {/* <div className="text-xs font-thin ">  <p>950+ phoots already created</p> </div> */}
            </div>
        </Link>
          
          <button className="btn m-auto w-15  border text-center  border-gray-700 sel"> Create account  </button>
        </div>
        
        
        <div className="">
          <div className="flex space-x-2 h-5  p-5 ">
            <img className="h4 relative h-3 w-auto" src="/paymenticons/credit_card.svg" />
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-paypal.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-apple.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-grab-pay.svg"/>
            <img className="h4 relative h-3 w-auto" src="/paymenticons/logo-giropay.svg"/>         
          </div>
          <div className="flex h-10 center justify-center"><p className="italic text-sm">one time payment. no subscription</p></div>    
        </div>
      
      </div>

      <div className="bg-neutral flex flex-wrap justify-around border border-gray-700 flex-wrap p-10 relative mt-20  z-10  inset-shadow  ...">
      <div className="card w-96 m-4 bg-base-100 shadow-xl shadow-xl">
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
    

    <div className="width-100 bg-neutral ">
      <div className="flex  justify-around flex-wrap z-10  md:p-10 p-3 ">
        {imageKeys.map(key => {
        if(key.length < 20){
          return
        }else{
            return(
            <div key={key}className="h-40 w-40 mt-5 mb-5  md:m-5 border flex-shrink border-gray-700 bg-accent rounded-md" >
              <p className="p-1 italic text-neutral">{key.slice(26,-4)}</p>
              <div className="text-center"> {!isImageReady &&  <Skeleton/>}</div>
              <Image className="relative rounded-md hover:brightness-75" onLoadingComplete={()=> handleImageLoad()}  src={key.substring(6)} loading="lazy" unoptimized={true}  width={150} height={100} alt="image"/>
              <p>{}</p>
            </div>)
          }       
        })}
        <div className="w-48 h-48 bg-white ">
          <Skeleton/>
        </div>
       
      </div>
    </div>
  
    <div className="bg-neutral md:pl-20 md:pr-20 p-10">
        <div className="flex flex-col justify-center items-center border border-gray-700   shadow-2xl">
            <h1 className="text-textwhite text-center  m-2 font-bold text-3xl">What type of photos should i upload?</h1>
            <p className="text-textwhite text-center p-5 "> We recommend 10 close-ups, 3 side profiles, 5 chest-up and 3 full body shots. Variety is key: facial expressions, locations, backgrounds and perspectives should all be different. Look away from the camera too. High quality photos work best; minimal makeup is advised as it may be exaggerated in the photos. No nudes, swimwear/underwear is OK.</p>
        </div>
    </div>
    <div className="">
        <div className="flex p-10 flex-wrap bg-neutral justify-evenly items-center flex-grow border border-gray-700">
          <img className="relative rounded-2xl m-4 ml-1 mr-1" src='/benyes.png'/>
          <img className="relative rounded-2xl m-4 ml-1 mr-1" src='/benno.png'/> 
        </div>
    </div>


<div className="bg-neutral border border-gray-700 md:pl-20 md:pr-20 p-10 ">
      <div className="explain  md:m-10  m-5    bg-neutral border border-gray-700  ">
        <div className="container p-4 text-white ">
          <h3 className="text-2xl leading-normal ">Whats actually going on?</h3>
          <p> Dreambooth is an open-source deep learning generation model used to fine-tune artifical intelligence imaging models and was developed by researchers like Nataniel Ruiz from Google Research and Boston University in 2022. It lets us teach artificial intelligence imaging models who you are by training it on your photos and then generate any image in any style you want with you in it!
          The artificial intelligence imaging model we use is called Stable Diffusion, created by many researchers at LMU University in Munich and RunwayML, supported by Emad Mostaque and others at Stability AI. </p>
          </div>
      </div>
</div>

<div className ="bg-neutral">
  <div className="FAQs flex flex-col align-center justify-centers items-center text-center text-white md:p-32 p-12">
    <h1 className="text-2xl font-semibold">What file formats of photos do you accept?</h1>
    <p className="p-10">Right now we support JPG, PNG, WebP, HEIC, JFIF, TIFF and RAW. We don't support AVIF or GIF! </p>
    <h1 className="text-2xl font-semibold">How long will it take to receive my avatars? </h1>
    <p className="p-10">Right now it'll take about 27 minutes (based on current processing times) to generate your avatars. </p>
    <h1 className="text-2xl font-semibold">What will you do with my photos? </h1>
    <p className="p-10">Great question. We only use them to train the AI model, render your avatars and then delete both the input photos and the AI model from our servers and the GPU API's servers (where it's processed) within 24 hours. Beware of other apps that generate profile photos and avatars as most store your data forever to mine it which means they can generate any image (like deepfakes) with your face in it forever. Some are even affiliated with foreign governments with might get your data! </p>

  </div>
</div>



<Footer/>
</div>
)
}
