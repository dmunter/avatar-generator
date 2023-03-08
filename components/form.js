
import { generateAsync } from "jszip"
import { useEffect, useState  } from "react"

export default function Form ({getItems}){
    const [formList, setFormList] = useState({gender: '' , styles: [] })
    const [selectedStyles, setSelectedStyles] = useState([])

    const setProfile=(index,style)=>{
       
       //console.log(index)
        const curr = style

        if(curr == "man" || curr == "woman" || curr == "dog" || curr == "cat"  ){
            if(curr != formList.gender){ //if selected twice, delete
                setFormList({gender: curr, styles: formList.styles})
            } else { setFormList({gender: '', styles: formList.styles})}
            
        } else {
            if(!formList.styles.includes(curr)){
                const ar = formList.styles
                ar.push(curr)
                console.log(formList)
                setFormList({gender: formList.gender , styles: ar})

                setSelectedStyles([...selectedStyles, index])
            } else {
                const newarray= formList.styles.filter((ele) => ele !== curr)
                setFormList({gender: formList.gender , styles: newarray})
                const ar = selectedStyles.filter((ele) => ele !== index)
                setSelectedStyles(ar)
            }
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

    // styles.forEach((item) )
    // const selectedStyle = {
    //     backgroundColor: 'red'
    // }

    const show=()=>{
        console.log("formlist")
        console.log( formList)
        console.log('selectedStyles')
        console.log( selectedStyles)
    }

    const hover = "glow style-container m-15 "
    const pulse = "constant-glow style-container m-15 "

    const genderHover = "gender-glow"
    const genderPulse= "gender-constant-glow"
    return(
        <div className="m-10 ">

            
                <div className="grid m-4 justify-items-center h-10 ..."><div className="text-neutral  bg-neutral-200 p-4  rounded-sm flex-col w-auto "> Select your profile</div></div>
                
             


            <div className="flex-container flex h-auto ">    
                <div key="man" className={formList.gender =='man' ? genderPulse : genderHover }
                    onClick={()=> setProfile(1, 'man')}>
                    <img className= "relative gender-images" src="/man-toilet-icon.svg" alt={"Man"} />
                </div>
                <div key="woman" className={formList.gender =='woman' ? genderPulse : genderHover }
                    onClick={()=> setProfile(2, 'woman')}>
                    <img className= "relative gender-images" src="/women-toilet-icon.svg" alt={"woman"} />
                </div>
                <div key="dog" className={formList.gender =='dog' ? genderPulse : genderHover }>
                    <div>comming soon</div>
                    <img className= "relative gender-images" src="/dog.png" alt={"dog"} />
                </div>
                <div key="cat" className={formList.gender =='cat' ? genderPulse : genderHover }>
                    <div>comming soon</div>
                    <img className= "relative gender-images" src="/cat.png" alt={"cat"} />
                </div>
            </div>
            

            <div className="flex-container flex space-around ">
                {
                styles.map((style, index) =>(                
                    <div key={style.id} 
                    className={selectedStyles.includes(style.id) ? pulse : hover}
                    onClick={()=>setProfile(index+1,style.style)}

                    ><p>{style.style}</p> <img className="" src="" alt=''/>  </div>
                ))
                }
            </div>
        </div>
    )
}