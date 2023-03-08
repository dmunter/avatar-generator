
const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function handler(req, res) {

    const  customerEmail = req.body.email;


    console.log(req.body)

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
       
        mode: 'payment',
        success_url: `${req.headers.origin}/stripecheckout?success={CHECKOUT_SESSION_ID}`,
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