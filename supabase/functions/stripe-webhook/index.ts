// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

import Stripe from  "https://esm.sh/stripe@11.11.0?target=deno";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2" 

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') as string, {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

console.log("Hello from Functions !!")
const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (request) => { 

  const signature = request.headers.get("Stripe-Signature");

  // First step is to verify the event. The .text() method must be used as the
  // verification relies on the raw request body rather than the parsed JSON.
  const body = await request.text();
  let receivedEvent;
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SIGNING_SECRET"),
      undefined,
      cryptoProvider
    );
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }
  
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get('SUPABASE_URL') ?? '',
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      // { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )
    // Now we can get the session or user object
    // const {
    //   data: { user },
    // } = await supabaseClient.auth.getUser()

    // And we can run queries in the context of our authenticated user
   

    const {customer} = await receivedEvent.data.object
    const { data, error } = await supabaseClient.from('profiles').update({paid: true}).eq('stripe_customer', customer)
    if (error) throw error

    // return new Response(JSON.stringify({ user, data }), {
    //   headers: { 'Content-Type': 'application/json' },
    //   status: 200,
    // })
  }catch(e){console.log(e)}



  
  return new Response(JSON.stringify({ ok: true }), { status: 200 });


})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'

// deploy with --legacy-bundle flag
// npx supabase functions deploy --no-verify-jwt  stripe-webhook --project-ref skuqnyoeaahobntdxcbj --legacy-bundle

// run function in deno envirnment 
// npx supabase functions serve --no-verify-jwt stripe-webhook-v3 --env-file ./supabase/functions/stripe-webhook-v3/.env.local

