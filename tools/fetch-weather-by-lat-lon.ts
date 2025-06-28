import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function fetchWeatherByLatLon(
  latitude: number,
  longitude: number
): Promise<CallToolResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,rain,showers,is_day&forecast_days=1`;
  const weather = await fetch(url, {
    headers: {
      "User-Agent": "weather-app/1.0",
    },
  });

  const weatherData = await weather.json();

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(weatherData, null, 2),
      },
    ],
  };
}
