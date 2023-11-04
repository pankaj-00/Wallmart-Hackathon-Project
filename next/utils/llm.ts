export async function llmResponse(transcript:string) {
    const response = await fetch(process.env.NEXT_PUBLIC_FLASK_API_URL as string, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: transcript }),
    });

    return response;
  }

  export default{
    llmResponse,
  }