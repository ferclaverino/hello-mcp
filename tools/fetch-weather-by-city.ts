import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export async function fetchWeatherByCity(
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
  const { latitude, longitude } = geocodingData.results[0];

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
