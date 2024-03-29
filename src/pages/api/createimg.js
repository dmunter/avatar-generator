import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function  handler(req, res) {
 
    

    const supabaseServerClient = createServerSupabaseClient({
        req,
        res,
      })
      const {
        data: { user },
      } = await supabaseServerClient.auth.getUser()

    //console.log(req)

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
                version: "46c555aa4cda44fb7f0196135b9ffea0a1d0bd429b530b16020404da68bcfa8d" ,
                input: {
                    prompt: 'closeup portrait of cjw as a as a flight attendant, highly detailed, proffessinal look, linkedin,  intricate details, bright colors, golden hour, getty images, suit and tie, digital painting, rossdraws.',
                    negative_prompt: 'two heads, two bodies',
                    num_outputs: 1,
                },
                webhook: "https://skuqnyoeaahobntdxcbj.functions.supabase.co/run-model",
                webhook_events_filter: [ "completed"]
                })
            });
        resp = await response.json()  
        //console.log(resp)
        // if(!resp){
        //         resp = json(resp.error)
        //         res.status(500).json(resp)
        // }   

        res.status(200).json(resp)

    }  
    
    ////METHOD GET
    //https://api.replicate.com/v1/predictions/i4mk6jzllfa2tdkce6qmh7dl3i
    //https://api.replicate.com/v1/predictions/v2lnbsz3sbglbbfcfs2pm5fqcq
    else if(req.method == 'DELETE'){
        
       // const request = JSON.parse(req.body)
        console.log(req.body)
        const response = await fetch('https://api.replicate.com/v1/predictions/2bdbgffibrfdlnqffxqdoftx74',{
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_SECRET}`,
            },
        })
        
        resp = await response.json()

       //await supabaseServerClient.from('profiles')
        //.update({"model_status": resp})
        //.eq('id', user.id)

        //console.log(Object.keys(resp))
        //console.log(resp.model)
        res.status(200).json(resp)
    } 
    
    res.status(200).json({message: 'header not supported'})

    
    
}
    
    
    
   
    
  

  

