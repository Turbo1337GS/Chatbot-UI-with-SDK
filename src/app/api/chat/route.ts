import { Gigasoft } from "@/app/GIGAI_SDK/core/backend/GigaSoft";
import { Admin } from "@/app/GIGAI_SDK/core/shared/types";

export async function POST(req: Request) {
  try {
    const { messages, additionalData } = await req.json();

    let model = additionalData.model;
    let images = additionalData.images;
    let apiKey = additionalData.apiKey;

    if (model === "GigAI-v1")
    {
      apiKey = process.env.GIGAI
    }
    else
    {
      apiKey = apiKey
    }
console.log(apiKey)

    if(String(model).toLowerCase().includes('ocr'))
    {
      if(!images)
      return new Response("Please send any image for OCR analysis!",)
    }



    // We can show the GigAI model what language the user is likely using
    const languageHeader = req.headers.get("accept-language");
    if (!model) {
      const error = "No Model Provided! Please chose model in navbar!";
      // Improving error responses with status and content type
      return new Response(JSON.stringify({ message: error }), {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (model === "GigAI-v1") {
    } else {
      if (!apiKey) {
        const error =
          "No API Key provided for the selected model! On our website, only GigAI-v1 model is completely free";
        return new Response(JSON.stringify({ message: error }), {
          status: 401,
          headers: { "Content-Type": "text/plain" },
        });
      }
    }

    const GigAI = new Gigasoft({ API_KEY: apiKey });

    // added OCR support, in SDK
    if (String(additionalData?.model).toLowerCase().includes("ocr")) {
      const ocr = await GigAI.ocr({
        model: "GigAI-OCR",
        image: images,
      });
      return new Response(ocr);
    }

    if (model && apiKey) {
      const adminConfig: Admin = {
        content: `
### Behave
- You are now acting publicly, maintain decorum, but don't be too serious!
- Be humorous
- Be funny, yet polite
      
### General
- We've retrieved the HTTP request header, and it seems that the user is using the language: ${languageHeader}
`,
      };

      const stream = await GigAI.chat({
        model: model,
        messages,
        stream: true,
        Admin: adminConfig,
        max_tokens: 4000,
        tools: [{ name: "web" }, { name: "qr_creator" }, { name: "GigaGem" }],
        image_base: images ? images : "",
      });

      return new Response(stream);
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";

    return new Response(JSON.stringify({ message: err }), {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const unexpectedError = "An unexpected problem occurred on the server!";
  return new Response(JSON.stringify({ message: unexpectedError }), {
    status: 500,
    headers: { "Content-Type": "text/plain" },
  });
}
