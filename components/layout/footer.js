export default function Footer(){

    return(
    <>
    <div className ="w-100  p-5 bg-neutral "> 
        <div className="border-t border-neutral-500 ">
        <div>
            <h1 className="pt-5 pb-5 uppercase bold font-bold antialiased tracking-wide">immgen</h1>
        </div>
    
            <footer className="footer flex flex-shrink justify-around  bg-neutral text-neutral-content">
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
    </div>
    </>
    )
}