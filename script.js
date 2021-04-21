const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=210&limit=20`;
let card = "";

async function pokemons() {
  // chamando api de pokemons
  const result = await fetch(apiUrl);
  const res = await result.json();

  // chamando funca para obter os dados dos pokemons
  res.results.forEach(function (pokemon) {
    fetchPokemonData(pokemon);
  });
}

async function fetchPokemonData(pokemon) {
  let url = pokemon.url;
  const response = await fetch(url);
  const pokeData = await response.json();

  let tiposPokemon = "";
  pokeData.types.forEach((item) => {
    tiposPokemon += `<li class='item'>${item.type.name}</li>`;
  });

  // monta os cards
  card += `<article class="card">
     <h3 class="title">${pokeData.name}</h3>
      <img class="foto" src="${pokeData.sprites.front_default}">
      <div>
      <h4>Tipos do pókemon</h4>
       ${tiposPokemon}
      </div>
    </article>`;

  // adiciona no html os dados
  const cards = document.querySelector(".container");
  cards.innerHTML = card;
}
