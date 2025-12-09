/* https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20 */
const app = document.getElementById("app");
let offset = 0;
const limit = 20;
let allLaboratories = [];

// --- Barre de recherche ---
const searchContainer = document.createElement("div");
searchContainer.classList.add("search-container");
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Rechercher par arrondissement (ex: 75015 ou 15)...";
searchContainer.appendChild(searchInput);
app.appendChild(searchContainer);

// ----- le contenant de la liste de tous les laboratoires ---
const listContainer = document.createElement("ul");
app.appendChild(listContainer);

//----- Création bouton VOIR PLUS-----
const btnLoadMore = document.createElement("button");
btnLoadMore.textContent = "voir plus";
app.appendChild(btnLoadMore);

// --- Affichage des labos ---
function displayLaboratories(laboratories) {
  listContainer.innerHTML = "";

  if (!laboratories.length) {
    const msg = document.createElement("p");
    msg.textContent = "Aucun laboratoire à afficher.";
    listContainer.appendChild(msg);
    return;
  }
  laboratories.forEach((laboratory) => {
    const listLabo = document.createElement("li");
    const title = document.createElement("h2");
    const name = document.createElement("p");
    const adresse = document.createElement("p");
    const telephone = document.createElement("p");
    const horaires = document.createElement("p");

    const containerActions = document.createElement("div");
    const btnSchedules = document.createElement("button");
    const btnGo = document.createElement("button");

    title.textContent = laboratory.liste;
    name.textContent = laboratory.laboratoire;
    adresse.textContent = `${laboratory.adresse}, ${laboratory.code_postal}`;
    telephone.textContent = laboratory.telephone;
    horaires.textContent = laboratory.horaires;
    btnGo.textContent = "GO";

    // ----- Création du bouton HORAIRES ---
    btnSchedules.innerText = "voir les horaires";
    horaires.style.display = "none";
    btnSchedules.addEventListener("click", () => {
      if (horaires.style.display === "none") {
        horaires.style.display = "block";
        btnSchedules.innerText = "Voir moins";
      } else {
        horaires.style.display = "none";
        btnSchedules.innerText = "voir les horaires";
      }
    });

    listLabo.appendChild(title);
    listLabo.appendChild(name);
    listLabo.appendChild(adresse);
    listLabo.appendChild(telephone);
    listLabo.appendChild(horaires);

    listLabo.appendChild(containerActions);
    containerActions.classList.add("card-actions");

    containerActions.appendChild(btnSchedules);
    containerActions.appendChild(btnGo);

    listContainer.appendChild(listLabo);
  });
}

async function fetchLaboratories() {
  try {
    const response = await fetch(
      `https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=${limit}&offset=${offset}`
    );
    const apiData = await response.json();
    const newLaboratories = apiData.results || [];

    allLaboratories = [...allLaboratories, ...newLaboratories];

    displayLaboratories(allLaboratories);
  } catch (error) {
    console.error(error);
  }
}
// --- Fonction de filtrage réutilisable ---
function applyFilter() {
  const valueInput = searchInput.value.trim();
  if (valueInput === "") {
    // si rien dans la barre → on affiche tout
    displayLaboratories(allLaboratories);
    return;
  }
  const filteredLabs = allLaboratories.filter((laboratory) => {
    const cp = String(laboratory.code_postal || "").trim();
    return cp.startsWith(valueInput) || cp.includes(valueInput);
  });

  displayLaboratories(filteredLabs);
}
// recherche en tapant
searchInput.addEventListener("input", applyFilter);

// Action du bouton VOIR PLUS
btnLoadMore.addEventListener("click", () => {
  offset += limit;
  fetchLaboratories();
});

fetchLaboratories();
