
import { useEffect, useState  } from "react"
import { womanStyles } from "./utilites/images.js"
import { manStyles } from "./utilites/images.js"

import Image from 'next/image'

export default function Form ({getItems}){
    const [formList, setFormList] = useState({gender: '' , styles: [] })
    const [selectedStyles, setSelectedStyles] = useState([])

    const[isToggle, setIsToggle] = useState(false)
    
    const woman_imageKeys = Object.keys(womanStyles).slice(Object.keys(womanStyles).length/2 );
    const man_imageKeys = Object.keys(manStyles).slice(Object.keys(manStyles).length/2 );
    //for(woman_imageKeys){
    // console.log(man_imageKeys)
    //}
    //console.log(woman_imageKeys)
    //const [isWomanImageReady, setIsWomanImageReady] = useState()
    //console.log(formList)

    const toggle=()=>{ 
        if(formList.gender == 'woman'){
            if(!isToggle){
                setFormList({gender: formList.gender, styles: woman_imageKeys.map((img)=> img.slice(20,-4)) })
                setIsToggle(!isToggle)
            } else{
                setFormList({gender: formList.gender, styles: [womanStyles]  })
                setIsToggle(!isToggle)
            }
        } else if(formList.gender == 'man'){
            if(!isToggle){
                setFormList({gender: formList.gender, styles: man_imageKeys.map((img)=> img.slice(18,-4)) })
                setIsToggle(!isToggle)
            } else{
                setFormList({gender: formList.gender, styles: [manStyles]  })
                setIsToggle(!isToggle)
            }
        }
    }
    const SetGender=(index,current)=>{

        if(!(formList.gender == current)){  
            setFormList({gender: current, styles: []})
        } else {
            setFormList({gender: '', styles: []})
        }
    }

    const SetList=(e, img)=>{ 
        var current
        if(formList.gender== 'woman')  current = img.slice(20,-4)
        if(formList.gender =='man') current = img.slice(18,-4)

        if(!formList.styles.includes(current)){
            const ar = formList.styles
            ar.push(current)
            setFormList({gender:formList.gender, styles: ar})
        } else {
            const ar= formList.styles.filter((ele) => ele !== current)
            setFormList({gender: formList.gender , styles: ar})
        }

    }
    //everytime styles update
    useEffect(()=>{
        getItems(formList)
    },[formList])

    const genders = [
        {id: 1, type: "man"},
        {id: 2, type: "woman"},
        {id: 3, type: "dog"},
        {id: 4, type: "cat"}
    ]
    const styles = [
        {id: 1 , style: "hobbit"},
        {id: 2 , style: "viking"},
        {id: 3 , style: "harry potter"},
        {id: 4 , style: "elf"},
        {id: 5 , style: "samurai"},
        {id: 6 , style: "pirate"},
        {id: 7 , style: "cyborg"},
        {id: 8 , style: "zombie"},
        {id: 9 , style: "witch"},
        {id: 10 , style: "jedi"},
        {id: 11 , style: "necromancer"},
        {id: 12 , style: "humanoid"},
        {id: 13 , style: "cyberpunk"},
        {id: 14, style: "archer"},
        {id: 15, style: "android"}, 
        {id: 16, style: "cold winter"},

    ]
    const woman_styles= [
        {id: 1 , style: "necromancer"},
        {id: 2 , style: "humanoid"},
        {id: 3 , style: "beautiful"},
        {id: 4 , style: "cyberpunk"},
        {id: 5, style:  "plantgod"},
        {id: 6, style: "detective"},
        {id: 7 , style: "hunter"},
        {id: 8 , style: "AI"},
        {id: 9 , style: "disney"},
        {id: 10, style: "cold winter"},
        {id:11 , style: "waterfall"},
        {id: 12 , style: "hobbit"},
        {id: 13 , style: "viking"},
        {id: 14 , style: "harry potter"},
        {id: 15 , style: "elf"},
        {id: 16 , style: "warrior"},
        {id: 17 , style: "pirate"},
        {id: 18 , style: "cyborg"},
        {id: 19, style: "zombie"},
        {id: 20, style: "witch"},
        {id: 21 , style: "jedi"},
        {id: 22 , style: "norweigen"},
        {id: 23, style: "robot"},     
        {id: 24, style: "35mm"},
        {id: 25 , style: "1976"},
        {id: 26, style: "1900s"},
  
    ]

    const hover = "glow style-container m-15 "
    const pulse = "constant-glow style-container m-15 "

    const genderHover = "gender-glow w-32 h-32 p-3 flex justify-center items-center"
    const genderPulse= "gender-constant-glow w-32 h-32 p-3 flex justify-center items-center"
    return(

    <>
        <div className="m-10 ">    
            <div className="grid m-4 justify-items-center h-10 ..."><div className="text-neutral-100 font-bold p-4 tracking-wider flex-col w-auto  "> Select your profile</div></div>              
            <div className="flex-container flex h-auto ">    
                <div key="man" className={formList.gender =='man' ? genderPulse : genderHover }
                    onClick={()=> SetGender(1, 'man')}>
                    <img className= "relative gender-images max-h-full" src="/man-toilet-icon.svg" alt={"Man"} />
                </div>
                <div className="hidden  md:divider md:divider-horizontal">OR</div> 
                <div key="woman" className={formList.gender =='woman' ? genderPulse : genderHover }
                    onClick={()=> SetGender(2, 'woman')}>
                        
                    <img className= "relative gender-images max-h-full" src="/women-toilet-icon.svg" alt={"woman"} />
                </div>
                <div className="hidden  md:divider md:divider-horizontal">OR</div> 
                <div key="dog" className={formList.gender =='dog' ? genderPulse : genderHover }>
                    <div className="absolute z-10 bg-neutral-400 bg-opacity-50 rounded-xl decoration-wavy text-center shadow-lg">coming soon</div>
                    <img className= "relative gender-images" src="/dog-icon.svg" alt={"dog"} />
                </div>
                <div className="hidden  md:divider md:divider-horizontal">OR</div> 
                <div key="cat" className={formList.gender =='cat' ? genderPulse : genderHover }>
                    <div className="absolute z-10 bg-neutral-400 bg-opacity-50 rounded-xl decoration-wavy text-center shadow-lg">coming soon</div>
                    <img className= "relative gender-images" src="/cat-animal-icon.svg" alt={"cat"} />
                </div>
            </div>
            {formList.gender && <div className="flex align-center items-center justify-center m-4 justify-items-center h-10 ..."><div className="text-neutral-100 font-bold p-4 tracking-wider flex-col w-auto "> Select your styles</div><input type="checkbox" onChange={()=>toggle()} className="toggle toggle-secondary"  defaulttoggle='true' /></div>}
           

            {/* <div className="flex-container flex space-around ">
                {
                styles.map((style, index) =>(                
                    <div key={style.id} 
                    className={selectedStyles.includes(style.id) ? pulse : hover}
                    onClick={()=>setProfile(index+1,style.style)}

                    ><p>{style.style}</p> <img className="" src="" alt=''/>  </div>
                ))
                }
            </div> */}
    {
        formList.gender == 'woman' &&
        <div className= "flex flex-wrap justify-center  around">
                {woman_imageKeys.map((img,index)=>
                    <div className={formList.styles.includes(img.slice(20,-4))? genderPulse: genderHover} value={img.slice(20,-4)} onClick={(e)=> SetList(e,img)} key={index}>     
                        <p className="absolute z-10 text-xl text-white bold bg-neutral-500 bg-opacity-50 rounded-xl ">{img.slice(20,-4)}</p>               
                        <Image className="relative rounded-md " src={img.slice(6)} loading="lazy"  height={150} width={150} alt="img"/>                
                    </div>                               
                )}
        </div>
    }
    {
        formList.gender == 'man' &&
        <div className= "flex flex-wrap justify-center  around">
                {man_imageKeys.map((img,index)=>
                    <div className={formList.styles.includes(img.slice(18,-4))? genderPulse: genderHover} value={img.slice(18,-4)} onClick={(e)=> SetList(e,img)} key={index}>     
                        <p className="absolute z-10 text-xl text-white bold bg-neutral-500 bg-opacity-50 rounded-xl ">{img.slice(18,-4)}</p>               
                        <Image className="relative rounded-md " src={img.slice(6)} loading="lazy"   height={150} width={150} alt="img"/>                
                    </div>                               
                )}
        </div>
        }           
    </div>

    </>
    )
}