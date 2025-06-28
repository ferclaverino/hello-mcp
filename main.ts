import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchWeatherByLatLon } from "./tools/fetch-weather-by-lat-lon";
import { fetchLatLongByCity } from "./tools/fetch-lat-lon-by-city";
import { fetchWeatherByCity } from "./tools/fetch-weather-by-city";
import { fetchWeatherByCityMock } from "./tools/fetch-weather-by-city-mock";
import { fetchWeatherByCityFixed } from "./tools/fetch-weather-by-city-fixed";

const server = new McpServer({
  name: "My MCP Server",
  version: "1.0.0",
});

// server.tool(
//   "fetch-weather-mock",
//   "Tool to fetch weather of a city",
//   {
//     city: z.string().describe("The name of the city to fetch the weather for"),
//   },
//   async ({ city }) => await fetchWeatherByCityMock(city)
// );

// server.tool(
//   "fetch-weather-fixed",
//   "Tool to fetch weather of a city",
//   {
//     city: z.string().describe("The name of the city to fetch the weather for"),
//   },
//   async ({ city }) => await fetchWeatherByCityFixed(city)
// );

server.tool(
  "fetch-weather",
  "Tool to fetch weather of a city",
  {
    city: z.string().describe("The name of the city to fetch the weather for"),
  },
  async ({ city }) => await fetchWeatherByCity(city)
);

server.tool(
  "fetch-weather-by-lat-lon",
  "Tool to fetch weather of a city by latitude and longitude",
  {
    latitude: z
      .number()
      .describe("The latitude of the city to fetch the weather for"),
    longitude: z
      .number()
      .describe("The longitude of the city to fetch the weather for"),
  },
  async ({ latitude, longitude }) =>
    await fetchWeatherByLatLon(latitude, longitude)
);

server.tool(
  "fetch-latitude-longitude",
  "Tool to fetch latitude and longidute of a city",
  {
    city: z
      .string()
      .describe("The name of the city to fetch the latitude and longitude for"),
  },
  async ({ city }) => await fetchLatLongByCity(city)
);

const transport = new StdioServerTransport();
await server.connect(transport);
