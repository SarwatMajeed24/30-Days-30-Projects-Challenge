export const fetchWeatherData = async (location: string, country?: string) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}${country ? `,${country}` : ""}`
      );
      if (!response.ok) {
        throw new Error("Location not found");
      }
      return await response.json();
    } catch (error) {
      throw new Error("Error fetching weather data");
    }
  };
  