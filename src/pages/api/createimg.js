import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function  handler(req, res) {
    

    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
      })
      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser()


    
    let resp;
    ////METHOD POST
    //Create replicate model
    if(req.method == 'POST'){
        const response = await fetch('https://api.replicate.com/v1/predictions', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${process.env.REPLICATE_SECRET}`,
                    'Content-Type': 'application/json'
                },
                
            body: JSON.stringify({  
                version: "0c9d701f2943566baebaaa630e5bc894dbbc6f07b483a798ffb1ad21982251a5"   ,
                input: {
                    prompt: 'closeup portrait of cjw as a as a flight attendant, highly detailed, proffessinal look, linkedin,  intricate details, bright colors, golden hour, getty images, suit and tie, digital painting, rossdraws.',
                    negative_prompt: 'two heads, two bodies',
                },
                webhook: "https://skuqnyoeaahobntdxcbj.functions.supabase.co/run-model",
                webhook_events_filter: [ "completed"]
                })
            });
        resp = await response.json()  
        console.log(resp)
        // if(!resp){
        //         resp = json(resp.error)
        //         res.status(500).json(resp)
        // }   

        res.status(200).json(resp)

    } 
    
    
    
    
    
    
    ////METHOD GET
    else if(req.method == 'GET'){
        const response = await fetch('https://dreambooth-api-experimental.replicate.com/v1/trainings/r2fuioveuvbllejkuvxqb62t54',{
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_SECRET}`,
                'Content-Type': 'application/json'
            },
        })
        
        resp = await response.json()

        await supabaseServerClient.from('profiles')
        .update({"model_status": resp})
        .eq('id', user.id)

        console.log(Object.keys(resp))
        console.log(resp.model)
        res.status(200).json(resp)
    } 
    
    

    
    
}
    
    
    
   
    
  

  

