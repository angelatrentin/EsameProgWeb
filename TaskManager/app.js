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


// VERSIONE AVANZATA
let attivitaAvanzate = [];
const stati = ["Da fare", "In corso", "Completata"];

function aggiornaListaAvanzata(filtro = null) {
  const lista = document.getElementById("listaAttivitaAvanzato");
  lista.innerHTML = "";

  const daMostrare = filtro
    ? attivitaAvanzate.filter(a => a.stato === filtro)
    : attivitaAvanzate;

  daMostrare.forEach((item, index) => {
    const div = document.createElement("div");

    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.value = item.nome;
    inputNome.disabled = true;

    const btnModifica = document.createElement("button");
    btnModifica.textContent = "Modifica";
    btnModifica.onclick = () => {
      if (inputNome.disabled) {
        inputNome.disabled = false;
        btnModifica.textContent = "Salva";
      } else {
        item.nome = inputNome.value.trim();
        inputNome.disabled = true;
        btnModifica.textContent = "Modifica";
        aggiornaListaAvanzata(document.getElementById("filtroStato").value);
      }
    };

    div.appendChild(inputNome);
    div.appendChild(btnModifica);

    const select = document.createElement("select");
    stati.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s;
      opt.text = s;
      if (s === item.stato) opt.selected = true;
      select.appendChild(opt);
    });

    select.onchange = () => {
      item.stato = select.value;
      aggiornaListaAvanzata(document.getElementById("filtroStato").value);
    };

    div.appendChild(select);
    
    const btnRimuovi = document.createElement("button");
    btnRimuovi.textContent = "X";
    btnRimuovi.onclick = () => {
      attivitaAvanzate.splice(index, 1);
      aggiornaListaAvanzata(document.getElementById("filtroStato").value);
    };
    div.appendChild(btnRimuovi);
    lista.appendChild(div);
  });
}

function aggiungiAttivitaAvanzato() {
  const input = document.getElementById("taskInputAvanzato");
  const nome = input.value.trim();
  if (nome !== "") {
    attivitaAvanzate.push({ nome, stato: "Da fare" });
    input.value = "";
    aggiornaListaAvanzata(document.getElementById("filtroStato").value);
  }
}

function filtraPerStato() {
  const stato = document.getElementById("filtroStato").value;
  aggiornaListaAvanzata(stato);
}

function cercaAttivita() {
  const termine = document.getElementById("cercaInput").value.toLowerCase();
  const filtrate = attivitaAvanzate.filter(a => a.nome.toLowerCase().includes(termine));
  const lista = document.getElementById("listaAttivitaAvanzato");
  lista.innerHTML = "";
  filtrate.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.nome} - ${item.stato}`;
    lista.appendChild(div);
  });
}