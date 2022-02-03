let card = "";

// pagination
let pageAtual = 0;
let itensByPage = 5;
let totalPage = 0;

async function selectedByQtdItens() {

  let select = document.getElementById('qtdSelected');
  const qtdSelected = select.options[select.selectedIndex].value;
  itensByPage = qtdSelected;
  await pokemons(pageAtual, qtdSelected);
}


async function pokemons(offset = 0, limit = 5) {
  card = '';
  pageAtual = offset;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


  stadoLoaging(true);
  // chamando api de pokemons
  const result = await fetch(apiUrl);
  const res = await result.json();

  totalPage = Math.ceil(res.count / itensByPage);

  // label total itens
  const labelItens = `<span> Total de pokemons ${res.count}.</span>`;
  document.getElementById('totalItens').innerHTML = labelItens;


  // chamando funcao para obter os dados dos pokemons
  res.results.forEach(function (pokemon) {
    fetchPokemonData(pokemon);
  });
}

// busca pokemom pelo id
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
      <h4>Tipo do pókemon :</h4>
       <p class='type-pokemon'>${tiposPokemon}</p>
      </div>
    </article>`;

  // adiciona no html os dados
  const cards = document.querySelector(".container");
  cards.innerHTML = card;
  stadoLoaging(false);
}