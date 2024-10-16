const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter your country: ", (country) => {
    rl.question("Enter your city: ", async (city) => {
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const date = new Date().toISOString().split('T')[0];
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}/${date}?key=${apiKey}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            const { tempmax, temp, precipprob, humidity, conditions } = data.days[0];
            const tempmaxCelsius = (tempmax - 32) * 5 / 9;
            const tempCelsius = (temp - 32) * 5 / 9;
            const precipitationProbability = precipprob;
            const humidityPercentage = humidity;
            const weatherConditions = conditions;
            console.log(`Max Temperature today: ${tempmaxCelsius.toFixed(2)}°C`);
            console.log(`Current Temperature: ${tempCelsius.toFixed(2)}°C`);
            console.log(`Precipitation Probability: ${precipitationProbability}%`);
            console.log(`Humidity: ${humidityPercentage}%`);
            console.log(`Weather Conditions: ${weatherConditions}`);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        } finally {
            rl.close();
        }
    });
});