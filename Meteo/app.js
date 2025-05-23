// VERSIONE BASE
async function getMeteoBase() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=46.0679&longitude=11.1211&current=temperature_2m ,relative_humidity_2m,precipitation,wind_speed_10m";
  
    try {
      const res = await fetch(url);
      const dati = await res.json();
  
      const div = document.getElementById("meteoBase");
      div.innerHTML = `
        <h3>Dati Meteo Base</h3>
        <p>🌡 Temperatura: ${dati.current.temperature_2m}°C</p>
        <p>💧 Umidità: ${dati.current.relative_humidity_2m}%</p>
        <p>🌧 Precipitazioni: ${dati.current.precipitation} mm</p>
        <p>🌬 Vento: ${dati.current.wind_speed_10m} km/h</p>
      `;
    } catch (err) {
      console.error("Errore nella chiamata API:", err);
      document.getElementById("meteoBase").innerHTML =
        "<p>Errore nel recupero dei dati meteo.</p>";
    }
  }
  
  getMeteoBase();