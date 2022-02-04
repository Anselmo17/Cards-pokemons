let card = "";

// pagination
let pageAtual = 0;
let itensByPage = 5;
let totalPage = 0;


async function pokemons(offset = 0, limit = 5, remontePage = true) {
  card = '';
  pageAtual = offset;

  // valida pagina
  if (offset < 0) {
    return;
  }

  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  stadoLoaging(true);

  // chamando api de pokemons
  const result = await fetch(apiUrl);
  const res = await result.json();


  // label total itens
  const labelItens = `<span> Total de pokemons ${res.count}.</span>`;
  document.getElementById('totalItens').innerHTML = labelItens;


  // monta paginacao
  if (remontePage) {
    montaPages(offset, res);
  }

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

// selected qtd itens page
async function selectedByQtdItens() {

  let select = document.getElementById('qtdSelected');
  const qtdSelected = select.options[select.selectedIndex].value;
  itensByPage = qtdSelected;
  await pokemons(pageAtual, qtdSelected);
}


// monta as paginas
function montaPages(offset, pokemons, remontePage = true) {

  const paginas = pokemons.results.length
  const pages = paginas > 5 ? 5 : paginas;
  let linePages = '';
  let linePaginacao = 0;
  linePaginacao = offset;


  // adiciona validação no botao
  let addDisabled = !pokemons.previous ? 'ls-disabled' : '';
  let addLastDisabled = !pokemons.next ? 'ls-disabled' : '';

  // let addActive = offset === 0 ? 'ls-active' : '';
  // monta as lista de paginas 
  linePages +=
    `
 <li class="${addDisabled}"><a href="#" 
        onclick="pokemons(${linePaginacao} - 1, itensByPage)">
         &laquo; Anterior</a>
 </li>
`;

  Array(pages).fill('').forEach((_, index) => {
    // const linePage = index + 1;
    linePaginacao = offset + index;
    const item = linePaginacao;
    linePages += `<li id="${linePaginacao}" onclick="pokemons(${item}, itensByPage, false)"><a href="#">${linePaginacao + 1}</a></li>`;
  })

  linePages += `<li class="${addLastDisabled}"
                onclick="pokemons(${linePaginacao} + 1, itensByPage)"
                ><a href="#">Próximo &raquo;</a>
              </li>`;

  // listPages
  const listPages = document.getElementById('listPages');
  listPages.innerHTML = linePages;
}


