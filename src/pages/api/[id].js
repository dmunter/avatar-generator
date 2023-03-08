import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function  handler(req, res) {
    const response = await fetch(
        "https://dreambooth-api-experimental.replicate.com/v1/trainings/" + req.query.id,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        let error = await response.json();
        res.statusCode = 500;
        res.end(JSON.stringify({ detail: error.detail }));
        return;
      }
      const prediction = await response.json();
      
      await supabaseServerClient.from('user_models')
      .update({"model_status": prediction})
      .eq('id', user.id)

      res.end(JSON.stringify(prediction));
    }
    
    
   
    
  

  

