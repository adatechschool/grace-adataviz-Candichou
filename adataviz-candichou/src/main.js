/* https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20
 */

async function fetchLaboratories() {
  /*   const laboratories = document.getElementById("app"); */

  try {
    const response = await fetch(
      "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/laboratoires-danalyses-medicales/records?limit=20"
    );
    const apiData = await response.json();
    /* console.log(apiData); */
    /* return apiData; */

    for (let i = 0; i < apiData.results.length; i++) {
      const listLabo = document.createElement("li");
      listLabo.innerHTML = `<h2>${apiData.results[i].liste}</h2> <p>${apiData.results[i].laboratoire}</p>`;
      document.body.appendChild(listLabo);
    }
  } catch (error) {
    console.log(error);
  }
}
fetchLaboratories();
