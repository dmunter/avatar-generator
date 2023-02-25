
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function handler(req, res) {

    const  customer_email  = req.body.email;
    const stripe_customer = req.body.stripe_customer;

    console.log(customer_email)
    console.log(stripe_customer)

    if(!req.body.email){
        return res.status(400).json({error: "invalid credentails: Try refresing the session"})
    }

  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1MbUYVCbnjYP0LbCNvO484FN',
            quantity: 1,
          },
        ],
       
        customer: stripe_customer,
        
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}