import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Authenticate from '../../components/Auth'
import Link from 'next/link'
import 'tailwindcss/tailwind.css'

export default function Home() {

  return (
<div className="container">

 
  <div className="" styles = {{margin: '25px', width: '20%', height: '25px'}}>

    

    </div>
      <div className="halie-container">   
        <div className="stars"></div>   
        <div className="twinkling"></div>
        <div className="container-shadow"></div>
        <div className="halie-background1"></div>
        <div className="halie-background2"></div>
        <div className="halie-background3"></div>
        <div className="halie-background4"></div>        
        
      </div>
      <div className="halie-container-footer "></div>

      <div className="showcase m-w-fit font-bold text-white text-center">
          <div className="... ring ring-blue-500 ring-offset-3 rounded-md text-6xl leading-normal">
            <h1 className="">Create your own </h1>
            <h2 className=" uppercase decoration-sky-500 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">photorealistic</h2>
            <h1>Ai avatars</h1>
            <div className="text-lg ">
              <p>As seen on tik tok! 📱</p>
              <p>Receive 100+ photos of yourself as an AI generated image 🖼️</p>
              <p>Your privacy is important. Your data is never shared! 🤫 </p>
            </div>
          </div>
          
        </div>

    <div className="showcase-end bg-primary-black border border-blue-100 border-t-1 border-l-0 border-r-0 border-b-1 h-35 ...">
      <br></br>
      <div className="m-auto mb-5  min-w-fit bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-1/4 rounded-lg text-center ...">
          <div className="text-3xl margin-10 p-5 text-white font-bold "> <Link href='/signin' className="border-2- p-1 rounded-sm"> Creat AI avatars now</Link></div>      
      </div>
    </div>
    <div className="explain m-auto mt-10 p-15 w-2/3 bg-primary-black border border-blue-100 ">
      <div className="container mx-auto text-white">
        <h3 className="text-2xl leading-normal">Whats actually going on</h3>
        <p> Dreambooth is an open-source deep learning generation model used to fine-tune artifical intelligence imaging models and was developed by researchers like Nataniel Ruiz from Google Research and Boston University in 2022. It lets us teach artificial intelligence imaging models who you are by training it on your photos and then generate any image in any style you want with you in it!
        The artificial intelligence imaging model we use is called Stable Diffusion, created by many researchers at LMU University in Munich and RunwayML, supported by Emad Mostaque and others at Stability AI. </p>
        </div>
  </div>
    

</div>
)
}
