const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const modal = document.querySelector(".details-modal");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function showModal(pokemon) {
  const modalContent = document.querySelector(".details-modal__content");

  modalContent.innerHTML = `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
  `;

  modal.classList.add("--active");
}

function closeModal() {
  modal.classList.remove("--active");
}

function attachClickEventToPokemons(pokemons) {
  pokemons.forEach((pokemon) => {
    const pokemonElement = document.getElementById(`pokemon-${pokemon.number}`);

    pokemonElement.addEventListener("click", function () {
      showModal(pokemon);
    });
  });
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `
      <li class="pokemon ${pokemon.type}" id="pokemon-${
          pokemon.number
        }" onclick="showModal(${pokemon.number})">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
          <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
          </ol>

          <img src="${pokemon.photo}"
            alt="${pokemon.name}">

        </div>
      </li>
    `
      )
      .join("");

    attachClickEventToPokemons(pokemons);
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordWithNextPage = offset + limit;

  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
