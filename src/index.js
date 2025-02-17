import 'bulma/css/bulma.min.css';

const apiKey = process.env.API_KEY;

const getWeather = async (location) => {
  const uri = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(uri);
    const data = await response.json();
    handleData(data);
  } catch (error) {
    alert('Error fetching weather data');
  }
};

const handleData = ({ resolvedAddress: location, days, currentConditions }) => {
  const { snowdepth } = days[0]; // Get snow depth from first day
  const { datetime, temp, icon, windspeed, conditions } = currentConditions; // Extract rest from current conditions

  const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${icon}.png`;

  document.getElementById('card').innerHTML = `
  <header class="card-header">
    <p class="card-header-title">Location: ${location}</p>
  </header>
  <div class="card-content">
    <div class="columns is-vcentered">
      <div class="column">
        <p>Temperature: ${temp} °C</p>
        <p>Windspeed: ${windspeed} m/s</p>
        <p>Snowdepth: ${snowdepth} cm</p>
        <p>Conditions: ${conditions}</p>
      </div>
      <div class="column is-narrow">
        <figure class="image is-96x96">
         <img src="${iconUrl}" alt="weather icon"/>
        </figure>
      </div>
    </div>
  </div>
  <footer class="card-footer">
    <p class="card-footer-item">Updated: ${datetime}</p>
  </footer>
  `;
};

document.getElementById('search-btn').addEventListener('click', () => {
  let location = document.getElementById('location').value.trim();
  getWeather(location);
  document.getElementById('location').value = '';
});
