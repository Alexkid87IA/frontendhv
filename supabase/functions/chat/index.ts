import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { message } = await req.json();

    // Process the message and generate appropriate responses based on content
    let response = '';

    if (message.toLowerCase().includes('coaching')) {
      response = "Le coaching avec Roger est un accompagnement personnalisé pour entrepreneurs. Nous proposons deux formules : une pour les porteurs de projet (12 semaines) et une pour les entrepreneurs confirmés. Voulez-vous en savoir plus sur une formule en particulier ?";
    } else if (message.toLowerCase().includes('tarif')) {
      response = "Notre offre premium de coaching est à 4 899€ pour un accompagnement complet de 12 semaines. Cela inclut 6 sessions individuelles, un suivi personnalisé, et l'accès à des ressources exclusives. Souhaitez-vous connaître le détail de ce qui est inclus ?";
    } else if (message.toLowerCase().includes('réserver') || message.toLowerCase().includes('session')) {
      response = "Vous pouvez réserver une session directement depuis notre calendrier en ligne. Je peux vous rediriger vers la page de réservation si vous le souhaitez. Préférez-vous d'abord en savoir plus sur nos différentes formules ?";
    } else if (message.toLowerCase().includes('contenu') || message.toLowerCase().includes('créer')) {
      response = "Roger propose une expérience de création de contenu premium qui inclut du tournage en studio professionnel, du montage expert, et une stratégie de diffusion multi-plateforme. Le tarif est de 4 899€ pour un pack complet. Voulez-vous que je vous détaille ce qui est inclus ?";
    } else {
      response = "Je suis là pour vous aider avec toutes vos questions sur le coaching, la création de contenu ou les services de Roger. Que souhaitez-vous savoir plus précisément ?";
    }

    return new Response(
      JSON.stringify({ response }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});