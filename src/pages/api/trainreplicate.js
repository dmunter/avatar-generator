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
        const response = await fetch('https://dreambooth-api-experimental.replicate.com/v1/trainings', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${process.env.REPLICATE_SECRET}`,
                    'Content-Type': 'application/json'
                },
    
            body: JSON.stringify({       
                input: {
                    instance_prompt: 'A photo of a cjw person',
                    class_prompt: 'A photo of a person',
                    instance_data: 'https://skuqnyoeaahobntdxcbj.supabase.co/storage/v1/object/sign/avatars/dcbfe15a-dd99-4e66-ad88-738b6a390a5f?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL2RjYmZlMTVhLWRkOTktNGU2Ni1hZDg4LTczOGI2YTM5MGE1ZiIsImlhdCI6MTY3NzI3NTExMSwiZXhwIjoxNjc5ODY3MTExfQ.POVIcZfLZFBSGiZgL5kkSPj1tV5msFrOYY9sT8FXigA&t=2023-02-24T21%3A45%3A12.476Z',
                    max_train_steps: 2000
                },
                model: "dmunter/test_model_tara",
                trainer_version: "cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa",
                webhook_completed: "https://skuqnyoeaahobntdxcbj.functions.supabase.co/replicate-webhook"
                })
            });
        resp = await response.json()
        
        await supabaseServerClient.from('profiles')
        .update({"model_status": resp})
        .eq('id', user.id)
      
        if(!resp.error){
                resp = json(resp.error)
                res.status(500).json(resp)
        }   
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
    
    
  
    
    else {       
        resp = json({message: "req.method != POST"})
        res.status(200).json(resp)
    }
    
    
    
    
}
    
    
    
   
    
  

  

