import Stripe from "stripe";
export default function handler(req,res){
    if(req.method == 'POST'){
        console.log(req.body)
    }

}