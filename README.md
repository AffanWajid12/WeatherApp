# WeatherApp
A weather app with AI integration
Overview
This project is a Weather Dashboard application that provides weather updates for a selected city. It fetches real-time data using the OpenWeather API, displays weather details such as temperature, humidity, wind speed, and weather conditions, and visualizes the data with various charts (bar chart, line chart, and doughnut chart) using Chart.js. The app also includes a chatbot for weather-related inquiries and a table displaying the 5-day weather forecast.

Features
City Search: Enter a city name to get real-time weather updates.
Temperature Units: Switch between Kelvin and Celsius.
Weather Details: Displays temperature, humidity, wind speed, and more.
Chart Visualization: Shows the temperature forecast for the next 5 days using bar, line, and doughnut charts.
Chatbot: Ask weather-related questions through a chatbot interface.
Weather-based Background: Changes the background image according to the weather conditions.
Technologies Used
HTML, CSS, JavaScript: Front-end structure and styling.
Chart.js: For creating the charts.
OpenWeather API: To fetch weather data.
Font Awesome: For icons.
Instructions to Run Locally
Prerequisites
You will need a web browser and a text editor like Visual Studio Code.
You need an API key from OpenWeather to fetch weather data.
Setup
Clone the repository or download the code to your local machine.

bash
Copy code
git clone <repository-url>
Open the project folder in your text editor.

In the file weather.js, replace the api_key with your OpenWeather API key:

javascript
Copy code
const api_key = 'your_openweather_api_key_here';
Make sure all necessary files are included:

index.html: The main HTML file.
styles.css: The stylesheet for styling.
weather.js: The JavaScript file for weather fetching and chart rendering.
Background images for weather conditions (like daysky.jpg, nightsky.jpg, etc.).
Open the index.html file in your browser to run the app locally.

Usage
Enter a city name in the input box and press the search button to view the current weather conditions.
Use the radio buttons to switch between temperature units.
Check the weather details and forecasts on the dashboard with visual charts.
You can ask questions to the chatbot in the "Ask Weather Related Question" input box.
Additional Notes
Ensure you have an active internet connection as the app fetches data from an external API.
This project uses asynchronous JavaScript (fetch API) to get weather data, so make sure that you allow network access for the application in your browser.
