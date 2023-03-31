import Image from 'next/image'
import Link from 'next/link'

export default function Footer(){

    return(
    <>
    <div className ="w-100  p-5 bg-neutral "> 
        <div className="border-t border-neutral-500 ">

        <div className= "flex justify-between wrap-none items-center p-3">
            <div className="flex wrap-no justify-end items-center space-x-3">
            <div className="gradient-button w-10 h-10  rounded-md p-1   ">
                <Image className="absolute w-8" src='/user-circle.svg' width={100} height={100} alt="hero"/>
            </div> 
            <div className="divider-horizontal divider white"></div>
            <h1 className="uppercase text-md font-semibold">Img-Gen </h1>                   
            </div>
        </div>
    
            <footer className="footer flex flex-shrink justify-around  bg-neutral text-neutral-content">
            <div>
                <span className="footer-title">Services</span> 
                <Link href="/signin" className="link link-hover">Imaging</Link>
                <Link href="/signin" className="link link-hover">Offers</Link>
                
            </div> 
            <div>
                <span className="footer-title">Company</span> 
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
            </div> 
            <div>
                <span className="footer-title">Legal</span> 
                <Link href="/policy" className="link link-hover">Terms of use</Link>
                <Link href="/policy" className="link link-hover">Privacy policy</Link>
                <Link href="/policy" className="link link-hover" >Cookie policy</Link>
            </div>
            </footer>
        </div>
    </div>
    </>
    )
}