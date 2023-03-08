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
        const request = JSON.parse(req.body)
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
                    instance_data: request.instance_data,
                    max_train_steps: 2000
                },
                model: request.model_name,
                trainer_version: "cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa",
                webhook_completed: "https://skuqnyoeaahobntdxcbj.functions.supabase.co/replicate-webhook"
                })
            });

        resp = await response.json()
        console.log(resp)
        // await supabaseServerClient.from('user_models')
        // .update({"model_status": resp})
        // .eq('model_name', req.body.model_name)
      
        // if(!resp.error){
        //         res.status(500).json(resp)
        // } 

    } else if(req.method == 'DELETE'){
        const response = await fetch('https://api.replicate.com/v1/models/dmunter/drewmuntercoyotesusdedu969/versions/1af7863d2322842bdc2910fdc4b3a52039bc1dc2b4e57c71218e98ca5752e56e',{
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${process.env.REPLICATE_SECRET}`,
            },
        })
        resp = await response.json()
        console.log(resp)
        res.status(200).json({resp})
    }
    else {
        res.status(200).json({message: 'no header sent'})

}
}