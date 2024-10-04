// export const fetchWeatherData = async (location: string, country?: string) => {
//     try {
//       const response = await fetch(
//         `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}${country ? `,${country}` : ""}`
//       );
//       if (!response.ok) {
//         throw new Error("Location not found");
//       }
//       return await response.json();
//     } catch (error) {
//       throw new Error("Error fetching weather data");
//     }
//   };
  

export const fetchWeatherData = async (location: string, country?: string) => {
  try {
    // Construct the API URL with location and optional country
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}${country ? `,${country}` : ""}`;

    const response = await fetch(apiUrl);
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Handle specific HTTP status codes if necessary
      if (response.status === 404) {
        throw new Error("Location not found. Please check the spelling.");
      }
      throw new Error("Failed to fetch weather data. Please try again later.");
    }

    // Return the JSON data
    return await response.json();
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Fetch Weather Data Error:", error);
    
    // Throw a new error with a generic message (or rethrow the original)
    throw new Error("Error fetching weather data. Please check your network connection and API key.");
  }
};
