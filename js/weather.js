// Run this code when the page content has fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Select the container where weather data will be displayed
    const weatherContainer = document.getElementById("weather-container");

    // Array of locations with their names and geographical coordinates
    const locations = [
        { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
        { name: "New York", latitude: 40.7128, longitude: -74.0060 },
        { name: "London", latitude: 51.5074, longitude: -0.1278 },
        { name: "Sydney", latitude: -33.8688, longitude: 151.2093 },
        { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
    ];

    // Function to fetch and display weather information for each location
    const fetchWeather = () => {
        // Clear out previous weather data before loading new data
        weatherContainer.innerHTML = "";

        // Loop through each location to fetch weather data
        locations.forEach(location => {
            // Make an API call to the Open-Meteo API for current weather
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`)
                .then(response => response.json()) // Parse the response as JSON
                .then(data => {
                    // Create a new div element for each location's weather
                    const weatherElement = document.createElement("div");
                    weatherElement.className = "weather"; // Add a class for styling

                    // Set the HTML content for displaying the location name and temperature
                    weatherElement.innerHTML = `<h3>${location.name}</h3><p>Temperature: ${data.current_weather.temperature}°C</p>`;

                    // Append the weather element to the container
                    weatherContainer.appendChild(weatherElement);
                });
        });
    };

    // Call the function to fetch weather data initially
    fetchWeather();

    // Set an interval to update the weather data every 60 seconds (60000 ms)
    setInterval(fetchWeather, 60000);
});
