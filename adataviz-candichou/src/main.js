/* https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20 */

async function fetchLaboratories() {
  const app = document.getElementById("app");

  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20"
    );
    const apiData = await response.json();
    const allLaboratories = apiData.results;

    // --- Barre de recherche ---
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");

    const searchInput = document.createElement("input");
    const searchButton = document.createElement("button");

    searchInput.type = "text";
    searchInput.placeholder =
      "Rechercher par arrondissement (ex: 75015 ou 15)...";
    searchButton.textContent = "RECHERCHER";

    app.appendChild(searchContainer);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchButton);

    const listContainer = document.createElement("ul");
    app.appendChild(listContainer);

    // --- Affichage des labos ---
    function displayLaboratories(laboratories) {
      listContainer.innerHTML = "";
      /* 
      if (!laboratories || laboratories.length === 0) {
        const empty = document.createElement("p");
        empty.textContent =
          "Aucun laboratoire ne correspond à cette recherche.";
        listContainer.appendChild(empty);
        return;
      } */

      laboratories.forEach((laboratory) => {
        const listLabo = document.createElement("li");
        const title = document.createElement("h2");
        const name = document.createElement("p");
        const adresse = document.createElement("p");
        const telephone = document.createElement("p");
        const horaires = document.createElement("p");
        const btnSeemore = document.createElement("button");

        title.textContent = laboratory.liste;
        name.textContent = laboratory.laboratoire;
        adresse.textContent = `${laboratory.adresse}, ${laboratory.code_postal}`;
        telephone.textContent = laboratory.telephone;
        horaires.textContent = laboratory.horaires;

        // bouton horaires
        btnSeemore.innerText = "voir les horaires";
        horaires.style.display = "none";

        btnSeemore.addEventListener("click", () => {
          if (horaires.style.display === "none") {
            horaires.style.display = "block";
            btnSeemore.innerText = "Voir moins";
          } else {
            horaires.style.display = "none";
            btnSeemore.innerText = "voir les horaires";
          }
        });

        listLabo.appendChild(title);
        listLabo.appendChild(name);
        listLabo.appendChild(adresse);
        listLabo.appendChild(telephone);
        listLabo.appendChild(horaires);
        listLabo.appendChild(btnSeemore);

        listContainer.appendChild(listLabo);
      });
    }

    // affichage initial
    displayLaboratories(allLaboratories);

    // --- Fonction de filtrage réutilisable ---
    function applyFilter() {
      const valueInput = searchInput.value.trim();
      /* 
      if (valueInput === "") {
        displayLaboratories(allLaboratories);
        return;
      } */

      const filteredLabs = allLaboratories.filter((laboratory) => {
        const cp = String(laboratory.code_postal || "").trim();

        return cp.startsWith(valueInput) || cp.includes(valueInput);
      });

      /* console.log("Résultats filtrés :", filteredLabs.length); */
      displayLaboratories(filteredLabs);
    }

    // recherche en tapant
    searchInput.addEventListener("input", applyFilter);

    // recherche au clic
    searchButton.addEventListener("click", applyFilter);
  } catch (error) {
    console.error(error);
  }
}

fetchLaboratories();
