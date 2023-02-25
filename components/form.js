
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
                console.log(ar)
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
        {id: 1 , style: "astronaut"},
        {id: 2 , style: "cowboy"},
        {id: 3 , style: "painting"},
        {id: 4 , style: "swimmer"},
        {id: 5 , style: "althete"},
        {id: 6 , style: "model"},
        {id: 7 , style: "space"},
        {id: 8 , style: "golfer"},
        {id: 9 , style: "gym"}
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
            <div className="image-container" onClick={show}> show the console</div>

            <div className=""> 
                <div className="grid justify-items-center h-10 ..."><div className=""> select your profile</div></div>
                
            </div>    
            <div className="flex-container flex h-auto ">    
                {
                genders.map((gender, index) =>(
                    <div key = {gender.type}
                    className={formList.gender == gender.type ? genderPulse : genderHover}
                    onClick={()=> setProfile(index+1, gender.type)}
                    >
                        <img className= "relative gender-images" src={"/"+gender.type+ ".png"} alt={gender.type} />
                     </div>
                ))
                }
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