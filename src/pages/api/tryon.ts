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

    // Prepare payload for the Stable Diffusion API
    const payload = {
      key: "SJeyQrKd0m1Xt63jvKlS3zDKWjNWcmoVuQuRtP1P2wLLpdSJXOVc7HggFVtg",
      prompt: "A realistic photo",
      negative_prompt: "Low quality, unrealistic, bad cloth, warped cloth",
      init_image: personImageUrl,
      cloth_image: productImageUrl,
      cloth_type: "upper_body",
      height: 720,
      width: 900,
      guidance_scale: 8.0,
      num_inference_steps: 20,
      seed: 128915590,
      temp: "no",
      webhook: null,
      track_id: null 
    };

    // Log the payload before sending
    console.log('Payload to Stable Diff API:', JSON.stringify(payload));

    // Make request to Stable Diffusion API
    const apiResponse = await fetch('https://stablediffusionapi.com/api/v5/fashion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Log the API response status
    console.log('API response status:', apiResponse.status);

    if (!apiResponse.ok) {
      const errorMessage = await apiResponse.text();
      console.error('Error from Stable Diffusion API:', errorMessage);
      return res.status(apiResponse.status).json({ message: errorMessage });
    }

    const data = await apiResponse.json();
    console.log('Response from Stable Diffusion API:', data);

    // Check if the response status is processing
    if (data.status === 'processing') {
      const fetchResultUrl = data.fetch_result;

      // Wait for 30 seconds before fetching the result
      setTimeout(async () => {
        try {
          const fetchResultResponse = await fetch(fetchResultUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          if (!fetchResultResponse.ok) {
            const fetchResultErrorMessage = await fetchResultResponse.text();
            console.error('Error from fetch result API:', fetchResultErrorMessage);
            return res.status(fetchResultResponse.status).json({ message: fetchResultErrorMessage });
          }

          const fetchResultData = await fetchResultResponse.json();
          console.log('Fetch result response:', fetchResultData);

          // Return the final result
          res.status(200).json(fetchResultData);
        } catch (fetchResultError) {
          console.error('Error in fetch result handler:', fetchResultError);

          if (fetchResultError instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: fetchResultError.message });
          } else {
            res.status(500).json({ message: 'Internal Server Error', error: String(fetchResultError) });
          }
        }
      }, 30000); // 30 seconds delay
    } else {
      // Return the response data if not processing
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error in tryon handler:', error); // Log the error

    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Return the error message
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: String(error) }); // Handle unknown error type
    }
  }
}