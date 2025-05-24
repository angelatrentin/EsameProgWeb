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
  
  // VERSIONE AVANZATA
  async function getMeteoAvanzato(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude= ${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code`;
  
    try {
      const res = await fetch(url);
      const dati = await res.json();
  
      const weatherCodeMap = {
        0: "☀️ Sereno",
        1: "🌤 Parzialmente nuvoloso",
        2: "⛅ Nuvoloso",
        3: "☁️ Coperto",
        45: "🌫 Nebbia",
        48: "🌫 Brina",
        51: "🌦 Pioggia leggera",
        53: "🌦 Pioggia moderata",
        55: "🌧 Pioggia intensa",
        61: "🌧 Forte pioggia",
        71: "❄️ Neve leggera",
        73: "🌨 Neve moderata",
        75: "❄️ Neve forte",
        80: "🌦 Piovaschi",
        95: "⛈ Temporale",
        96: "⛈ Temporale con grandine",
        99: "⛈ Temporale violento"
      };
  
      const condizione = weatherCodeMap[dati.current.weather_code] || "🌐 Condizioni sconosciute";
  
      const div = document.getElementById("meteoAvanzato");
      div.innerHTML = `
        <h3>Dati Meteo Avanzati</h3>
        <p>📍 Coordinate: ${lat.toFixed(4)}, ${lon.toFixed(4)}</p>
        <p>🌡 Temperatura: ${dati.current.temperature_2m}°C</p>
        <p>💧 Umidità: ${dati.current.relative_humidity_2m}%</p>
        <p>🌧 Precipitazioni: ${dati.current.precipitation} mm</p>
        <p>🌬 Vento: ${dati.current.wind_speed_10m} km/h</p>
        <p>☁️ Condizioni: ${condizione}</p>
      `;
    } catch (err) {
      console.error("Errore nella chiamata API avanzata:", err);
      document.getElementById("meteoAvanzato").innerHTML =
        "<p>Errore nel recupero dei dati locali.</p>";
    }
  }
  
  function getLocalizzazione() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          getMeteoAvanzato(lat, lon);
        },
        (err) => {
          console.warn("Impossibile recuperare la posizione:", err.message);
          getMeteoAvanzato(46.0679, 11.1211);
        }
      );
    } else {
      alert("Geolocalizzazione non supportata.");
      getMeteoAvanzato(46.0679, 11.1211);
    }
  }
  
  getMeteoBase();
  getLocalizzazione();