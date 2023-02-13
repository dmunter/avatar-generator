
import Link from 'next/link'

import 'tailwindcss/tailwind.css'


export default function Home() {

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
          <div className="... ring ring-blue-500 ring-offset-3 rounded-md text-6xl leading-normal">
            <h1 className="">Create your own </h1>
            <h2 className=" uppercase decoration-sky-500 text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">picture perfect</h2>
            <h1>AI avatars</h1>
            <div className="text-lg leading-7">
              <p>As seen on tik tok! 📱</p>
              <p>Receive 100+ photos of yourself as an AI generated image 🖼️</p>
              <p>Your privacy is important. Your data is never shared! 🤫 </p>
            </div>
          </div>
          
        </div>

    <div className="showcase-end bg-primary-black border-y-2 border-blue-500 ... h-35 ...">
      <br></br>
      <div className="m-auto mb-5  min-w-fit bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-1/4 rounded-lg text-center ...">
      <Link className="text-3xl margin-10  text-white font-bold " href='/signin'> <div className="p-5">  Create AI avatars now  </div></Link>
      </div>
    </div>
    <div className="explain m-auto mt-10 p-15 w-2/3 bg-primary-black border border-blue-100 ">
      <div className="container p-4 text-white">
        <h3 className="text-2xl leading-normal">Whats actually going on?</h3>
        <p> Dreambooth is an open-source deep learning generation model used to fine-tune artifical intelligence imaging models and was developed by researchers like Nataniel Ruiz from Google Research and Boston University in 2022. It lets us teach artificial intelligence imaging models who you are by training it on your photos and then generate any image in any style you want with you in it!
        The artificial intelligence imaging model we use is called Stable Diffusion, created by many researchers at LMU University in Munich and RunwayML, supported by Emad Mostaque and others at Stability AI. </p>
        </div>
  </div>
    

</div>
)
}
