/* https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20
 */

async function fetchLaboratories() {
  const app = document.getElementById("app");
  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20"
    );
    const apiData = await response.json();
    /* console.log(apiData); */
    /* return apiData; */

    const research = document.createElement("div");
    research.classList.add("search-container");

    //création de la barre et le bouton de recherche
    const researchBar = document.createElement("input");
    const btnResearch = document.createElement("button");
    btnResearch.textContent = "RECHERCHER";
    app.appendChild(research);
    research.appendChild(researchBar);
    research.appendChild(btnResearch);
    //le contenu de la barre de recherche
    researchBar.type = "text";
    researchBar.placeholder = "Rechercher par arrondissement (ex: 75010)...";

    btnResearch.addEventListener("click", () => {});

    apiData.results.forEach((laboratory) => {
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

      app.appendChild(listLabo);
      listLabo.appendChild(title);
      listLabo.appendChild(name);
      listLabo.appendChild(adresse);
      listLabo.appendChild(telephone);
      listLabo.appendChild(horaires);
      listLabo.appendChild(btnSeemore);

      // création du bouton "voir les horaires"
      btnSeemore.innerText = "voir les horaires";
      horaires.style.display = "none";
      listLabo.appendChild(btnSeemore);
      // action du bouton
      btnSeemore.addEventListener("click", () => {
        if (horaires.style.display === "none") {
          horaires.style.display = "block";
          btnSeemore.innerText = "Voir moins";
        } else {
          horaires.style.display = "none";
          btnSeemore.innerText = "voir les horaires";
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

fetchLaboratories();
