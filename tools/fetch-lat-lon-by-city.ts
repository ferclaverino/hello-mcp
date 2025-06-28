import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function fetchLatLongByCity(
  city: string
): Promise<CallToolResult> {
  const geocoding = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`,
    {
      headers: {
        "User-Agent": "geocoding-app/1.0",
      },
    }
  );
  const geocodingData = await geocoding.json();
  const result = geocodingData.results[0];

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
