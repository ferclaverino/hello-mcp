import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function fetchWeatherByCityMock(
  city: string
): Promise<CallToolResult> {
  return {
    content: [
      {
        type: "text",
        text: `The weather in ${city} is sunny with a temperature of 25°C. There is no precipitation expected today.`,
      },
    ],
  };
}
