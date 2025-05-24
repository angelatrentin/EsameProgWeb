// VERSIONE BASE
let tempoBase = 0;
let intervalloBase = null;

function formattaTempo(t) {
  let min = Math.floor(t / 60).toString().padStart(2, "0");
  let sec = (t % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function startBase() {
  if (!intervalloBase) {
    intervalloBase = setInterval(() => {
      tempoBase++;
      document.getElementById("displayBase").textContent = formattaTempo(tempoBase);
    }, 1000);
  }
}

function stopBase() {
  clearInterval(intervalloBase);
  intervalloBase = null;
}

function resetBase() {
  stopBase();
  tempoBase = 0;
  document.getElementById("displayBase").textContent = "00:00";
}

// VERSIONE AVANZATA 
let tempoAvanzato = 0;
let intervalloAvanzato = null;
let giri = [];

function formattaTempoMS(t) {
  let min = Math.floor(t / 60).toString().padStart(2, "0");
  let sec = Math.floor(t % 60).toString().padStart(2, "0");
  let ms = Math.floor((t * 100) % 100).toString().padStart(2, "0");
  return `${min}:${sec}:${ms}`;
}

function startAvanzato() {
  if (!intervalloAvanzato) {
    intervalloAvanzato = setInterval(() => {
      tempoAvanzato += 0.01;
      document.getElementById("displayAvanzato").textContent = formattaTempoMS(tempoAvanzato);
    }, 10); 
  }
}

function stopAvanzato() {
  clearInterval(intervalloAvanzato);
  intervalloAvanzato = null;
}

function resetAvanzato() {
  stopAvanzato();
  tempoAvanzato = 0;
  giri = [];
  document.getElementById("displayAvanzato").textContent = "00:00:00";
  document.getElementById("giriList").innerHTML = "";
}

function giroAvanzato() {
  const tempoCorrente = formattaTempoMS(tempoAvanzato);
  giri.push(tempoCorrente);
  const ul = document.getElementById("giriList");
  ul.innerHTML = "";
  giri.forEach((g, index) => {
    const li = document.createElement("li");
    li.textContent = `Giro ${index + 1}: ${g}`;
    ul.appendChild(li);
  });
}