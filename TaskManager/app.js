// VERSIONE BASE
let attivitaBase = [];

function aggiornaListaBase() {
  const lista = document.getElementById("listaAttivitaBase");
  lista.innerHTML = "";
  attivitaBase.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.nome;

    const btnRimuovi = document.createElement("button");
    btnRimuovi.textContent = "X";
    btnRimuovi.onclick = () => rimuoviAttivitaBase(index);

    li.appendChild(btnRimuovi);
    lista.appendChild(li);
  });
}

function aggiungiAttivitaBase() {
  const input = document.getElementById("taskInputBase");
  const nome = input.value.trim();
  if (nome !== "") {
    attivitaBase.push({ nome });
    input.value = "";
    aggiornaListaBase();
  }
}

function rimuoviAttivitaBase(index) {
  attivitaBase.splice(index, 1);
  aggiornaListaBase();
}