import { Client } from "@gradio/client";

// Define the file function
async function file(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const fileName = url.split('/').pop() || 'file';
  return new File([blob], fileName, { type: blob.type });
}

// Wrap the code in an async function
export async function main(): Promise<any> {
  try {
    console.log("Fetching example image...");
    const response_0 = await fetch("https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png");
    const exampleImage = await response_0.blob();
    console.log("Example image fetched.");

    console.log("Connecting to Gradio client...");
    const app = await Client.connect("Nymbo/Virtual-Try-On");
    console.log("Connected to Gradio client.");

    console.log("Making prediction...");
    const result = await app.predict("/tryon", [
      { "background": await file('https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'), "layers": [], "composite": null },
      exampleImage,
      "Hello!!",
      true,
      true,
      30,
      42,
    ]);
    console.log("Prediction made.");

    return result.data;
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  }
}