const API_URL = "http://www.omdbapi.com";
const APY_KEY = "af5566e9";

const searchInput = document.querySelector("#search");
const titleList = document.querySelector("#title-list");

const searchMovie = async () => {
  try {
    const search = searchInput.value;
    titleList.innerHTML = "";

    if (!search) return;
    if (search?.length < 3) {
      titleList.insertAdjacentHTML(
        "beforeend",
        "<li>Escribe minimo 3 letras</li>"
      );
      return;
    }

    const response = await fetch(`${API_URL}?apikey=${APY_KEY}&s=${search}`);
    const json = await response.json();
    const { Search: results } = json;

    if (!results) {
      titleList.insertAdjacentHTML(
        "beforeend",
        "<li>No se encontraron resultados</li>"
      );
      return;
    }

    results.forEach(({ Title: title }) => {
      titleList.insertAdjacentHTML("beforeend", `<li>${title}</li>`);
    });
  } catch (error) {
    console.error(error);
  }
};

searchInput.addEventListener("keyup", searchMovie);
