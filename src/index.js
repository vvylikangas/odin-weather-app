const apiKey = 'MLBVAAJQYEQ75725W5D9M65EF';

const getWeather = async (location) => {
  const uri = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;
  const response = await fetch(uri);
  const data = await response.json();
  handleData(data);
};

const handleData = ({ resolvedAddress: location, days, currentConditions }) => {
  const { snowdepth } = days[0]; // Get snow depth from first day
  const { datetime, temp, icon, windspeed, conditions } = currentConditions; // Extract rest from current conditions

  const iconUrl = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/${icon}.png`;

  document.getElementById('container').innerHTML = `
  <header>Location: ${location}</header>
  <p>Updated: ${datetime}</p>
  <p>Temperature: ${temp} °C</p>
  <p>Windspeed: ${windspeed} m/s</p>
  <p>Snowdepth: ${snowdepth} cm</p>
  <p>Conditions: ${conditions}</p>
  <span><img src="${iconUrl}"/></span> 
  `;
};

document.getElementById('search-btn').addEventListener('click', () => {
  let location = document.getElementById('location').value.trim();
  getWeather(location);
});
