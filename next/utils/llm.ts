import axios from "axios";

export async function llmResponse(transcript: string) {
    const options = {
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "X-API-KEY": process.env['NEXT_PUBLIC_VOICE_AI_KEY'],
        },
    };
    const body = JSON.stringify({ query: transcript })

    const response = await axios.post(process.env['NEXT_PUBLIC_FLASK_API_URL'] as string,
        body,
        options
    );

    return response;
}

export default {
    llmResponse,
}