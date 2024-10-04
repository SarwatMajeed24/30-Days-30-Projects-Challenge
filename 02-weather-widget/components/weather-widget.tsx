"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Input } from "@/components/ui/input"; // shadcn/ui Input
import { Card, CardContent } from "@/components/ui/card"; // shadcn/ui Card
import { CloudIcon, MapPinIcon } from "lucide-react"; // Icons
import { fetchWeatherData } from "@/utils/weatherApi"; // Weather API fetch function

interface WeatherData {
  temperature: number;
  description: string;
  location: string;
  unit: string;
}

export default function WeatherWidget() {
  const [location, setLocation] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedLocation = location.trim();

    if (trimmedLocation === "") {
      setError("Please enter a valid city and/or country.");
      setWeather(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherData(trimmedLocation);
      const weatherData: WeatherData = {
        temperature: data.current.temp_c,
        description: data.current.condition.text,
        location: trimmedLocation,
        unit: "C",
      };
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Location not found. Please try again.");
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative flex flex-col md:flex-row justify-center items-center h-screen bg-cover bg-center bg-[url('https://t4.ftcdn.net/jpg/03/97/07/27/360_F_397072723_78WD3dv1yVqflBOSoIycAyShIJ0DPJQN.jpg')]"
    >
      
      <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
      <div className="relative z-10 text-center mb-6 md:mb-0 md:mr-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-red-700">Weather Widget</h1>
        <p className="text-lg md:text-xl text-grey-900 font-extrabold">Get current weather information for any location</p>
        <p className="text-lg md:text-xl text-red-900 font-extrabold">write any city or country name</p>
      </div>
      <div className="relative z-10 mb-6 md:mb-0 w-full max-w-md">
        <Card className="bg-white rounded-full shadow-xl p-6 w-full">
          <CardContent>
            <form onSubmit={handleSearch} className="mt-4 flex flex-col items-center gap-2">
              <Input
                type="text"
                placeholder="Enter a city or country"
                value={location}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                className="w-full rounded-full border-purple-600 focus:ring focus:ring-blue-400"
              />
              <Button type="submit" disabled={isLoading} className="bg-purple-800 hover:bg-purple-500 text-white w-full rounded-full">
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </form>
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
            {weather && (
              <div className="mt-6 text-center">
                <div className="text-5xl font-bold text-blue-600">{weather.temperature}°{weather.unit}</div>
                <div className="flex justify-center items-center mt-2">
                  <CloudIcon className="w-8 h-8 text-gray-600" />
                  <span className="ml-2 text-xl">{weather.description}</span>
                </div>
                <div className="mt-4 text-gray-700">
                  <MapPinIcon className="inline w-6 h-6 text-gray-600" />
                  <span>{weather.location}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


