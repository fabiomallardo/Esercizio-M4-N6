let url = "https://jsonplaceholder.typicode.com/users";
let res = document.getElementById("res");

window.onload = () => {
  let allData = []; // Variabile per salvare tutti i dati ricevuti dall'API

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      allData = data; // Salviamo i dati ricevuti

      // Mostriamo tutti i dati inizialmente
      renderTable(allData);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
      res.innerHTML = "<p>Errore nel caricamento dei dati.</p>";
    }
  };

  // Funzione per filtrare i dati e aggiornare la tabella
  const filterData = () => {
    const filterBy = document.getElementById("filter").value; // Valore del dropdown
    const query = document.getElementById("search").value.toLowerCase(); // Testo dell'input in minuscolo

    // Filtriamo i dati
    const filteredData = allData.filter(user =>
      user[filterBy].toLowerCase().includes(query)
    );

    // Aggiorniamo la tabella con i dati filtrati
    renderTable(filteredData);
  };

  // Funzione per generare la tabella HTML
  const renderTable = (data) => {
    let tableHTML = `
      <table border="5" class="table table-striped mb-0">
        <thead>
          <tr>
            <th class="table-primary">Nome</th>
            <th class="table-primary">Username</th>
            <th class="table-primary">Email</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Creiamo le righe della tabella
    data.forEach(user => {
      tableHTML += `
        <tr class="table-primary">
          <td class="table-primary">${user.name}</td>
          <td class="table-primary">${user.username}</td>
          <td class="table-primary">${user.email}</td>
        </tr>
      `;
    });

    tableHTML += `</tbody></table>`;

    // Inseriamo la tabella nella pagina
    res.innerHTML = tableHTML;
  };

  // Event listeners per filtro e input
  document.getElementById("filter").addEventListener("change", filterData);
  document.getElementById("search").addEventListener("input", filterData);

  // Chiamata iniziale per recuperare i dati
  getData();
};


// Event listener per il bottone
document.getElementById("btn").addEventListener("click", () => {
  const nome = document.getElementById("nome").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Salva i valori in localStorage
  localStorage.setItem("nome", nome);
  localStorage.setItem("username", username);
  localStorage.setItem("email", email);

  console.log(`Salvato: Nome=${nome}, Username=${username}, Email=${email}`);
});

// Funzione per recuperare i valori salvati in localStorage
const handleSearch = () => {
  const savedNome = localStorage.getItem("nome");
  const savedUsername = localStorage.getItem("username");
  const savedEmail = localStorage.getItem("email");

  if (savedNome || savedUsername || savedEmail) {
    // Ripristina i valori salvati nei rispettivi campi
    if (savedNome) document.getElementById("nome").value = savedNome;
    if (savedUsername) document.getElementById("username").value = savedUsername;
    if (savedEmail) document.getElementById("email").value = savedEmail;

    console.log(`Valore recuperato: Nome=${savedNome}, Username=${savedUsername}, Email=${savedEmail}`);
  }
};

// Esegui il recupero all'avvio
handleSearch();
