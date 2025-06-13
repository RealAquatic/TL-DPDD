const navButtons = document.querySelectorAll('.buttons button');

navButtons.forEach(button => {
  button.addEventListener('click', () => {
    const page = button.getAttribute('data-page');
    if (page) {
      window.location.href = page;
    }
  });
});

const currentPage = window.location.pathname.split('/').pop();

navButtons.forEach(button => {
  if(button.getAttribute('data-page') === currentPage) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
});

let allPokemon = [];

async function GetPokemon() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1302');
    const data = await response.json();
    allPokemon = data.results;
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
  }
}

function CreatePokemon(pokemonList) {
  const container = document.querySelector('.pokemon-scroll-frame');
  container.innerHTML = '';

  pokemonList.forEach(pokemon => {
    const urlParts = pokemon.url.split('/').filter(Boolean);
    const id = urlParts[urlParts.length - 1];

    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    const button = document.createElement('button');
    button.classList.add('pokemon-box');

    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = pokemon.name;

    const span = document.createElement('span');
    span.textContent = pokemon.name;

    button.appendChild(img);
    button.appendChild(span);

    container.appendChild(button);
  });
}

function filterPokemon(searchTerm) {
  const filtered = allPokemon.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  CreatePokemon(filtered);
}

async function Load() {
  await GetPokemon();
  CreatePokemon(allPokemon);

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    filterPokemon(e.target.value);
  });

  const container = document.querySelector('.pokemon-scroll-frame');
  container.addEventListener('click', (e) => {
    const button = e.target.closest('.pokemon-box');
    if (!button) return;
    const name = button.querySelector('span').textContent;
    window.location.href = `Info.html?pokemon=${encodeURIComponent(name)}`;
  });
  
}

Load();
