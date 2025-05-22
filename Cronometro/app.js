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