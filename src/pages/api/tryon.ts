import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API route accessed'); // Log the access

  // Check for POST method
  if (req.method !== 'POST') {
    console.log('Method not allowed'); // Log method checks
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { personImageUrl, productImageUrl } = req.body;

    // Check the incoming request data
    console.log('Request body:', req.body);

    // Ensure both URLs are present
    if (!personImageUrl || !productImageUrl) {
      console.error('Missing parameters:', { personImageUrl, productImageUrl });
      return res.status(400).json({ message: 'Missing parameters' });
    }

    // Prepare payload for the Kolors API
    const payload = {
      data: [
        { path: personImageUrl },
        { path: productImageUrl },
        0, // Assuming this is a valid value
        true, // Assuming this is a valid value
      ],
      fn_index: 2,   // The function index used in the API request
  session_hash: "ggsq87xbx6t",  // Use your existing session hash
  trigger_id: 26  // The trigger_id you're using
    };

    // Log the payload before sending
    console.log('Payload to Kolors API:', JSON.stringify(payload));

    // Make request to Kolors API
const apiResponse = await fetch('https://kwai-kolors-kolors-virtual-try-on.hf.space/queue/join?', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

    // Log the API response status
    console.log('API response status:', apiResponse.status);

    // Check for non-200 responses
    if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text();
      console.error('Error from Kolors API:', errorMessage);
      return res.status(apiResponse.status).json({ message: errorMessage });
    }

    const data = await apiResponse.json();
    return res.status(200).json(data); // Return the response data
  } catch (error: unknown) {
    console.error('Error in tryon handler:', error);

    // Type guard to handle known error types
    if (error instanceof Error) {
      // Log error details
      console.error('Error details:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      // Handle unknown error types
      return res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred.' });
    }
  }
}
