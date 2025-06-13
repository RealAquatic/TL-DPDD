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

async function fetchPokemonDetails(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokémon not found');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
}

function displayPokemonDetails(pokemon) {
  const container = document.querySelector('.body');
  container.innerHTML = ''; // clear previous content

  if (!pokemon) {
    container.textContent = 'Pokémon details not found.';
    return;
  }

  // Clear container styles for flex centering
  container.style.display = 'flex';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.padding = '20px';

  // Main card container
  const card = document.createElement('div');
  card.classList.add('pokemon-detail-card');
  card.style.backgroundColor = '#fff';
  card.style.borderRadius = '20px';
  card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
  card.style.maxWidth = '400px';
  card.style.width = '100%';
  card.style.padding = '30px 20px';
  card.style.textAlign = 'center';
  card.style.userSelect = 'none';

  // Title
  const title = document.createElement('h2');
  title.textContent = pokemon.name.toUpperCase();
  title.style.marginBottom = '15px';
  title.style.fontWeight = '700';
  title.style.color = '#333';

  // Image wrapper with glow
  const imgWrapper = document.createElement('div');
  imgWrapper.style.position = 'relative';
  imgWrapper.style.display = 'inline-block';
  imgWrapper.style.marginBottom = '25px';

  // Back glow effect using a blurred colored div
  const glow = document.createElement('div');
  glow.style.position = 'absolute';
  glow.style.top = '50%';
  glow.style.left = '50%';
  glow.style.transform = 'translate(-50%, -50%)';
  glow.style.width = '150px';
  glow.style.height = '150px';
  glow.style.borderRadius = '50%';
  glow.style.filter = 'blur(25px)';
  glow.style.backgroundColor = '#ffcb05'; // Pokemon yellow glow
  glow.style.zIndex = '0';
  glow.style.opacity = '0.7';

  // Actual image
  const img = document.createElement('img');
  img.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  img.alt = pokemon.name;
  img.style.width = '150px';
  img.style.position = 'relative';
  img.style.zIndex = '1';
  img.style.borderRadius = '15px';
  img.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';

  imgWrapper.appendChild(glow);
  imgWrapper.appendChild(img);

  // Stats container (grid)
  const statsGrid = document.createElement('div');
  statsGrid.style.display = 'grid';
  statsGrid.style.gridTemplateColumns = '1fr 1fr';
  statsGrid.style.gap = '15px';
  statsGrid.style.justifyItems = 'start';
  statsGrid.style.color = '#444';

  // Stat icons (emoji placeholders)
  const statIcons = {
    hp: '❤️',
    attack: '⚔️',
    defense: '🛡️',
    'special-attack': '✨',
    'special-defense': '🛡️',
    speed: '⚡',
  };

  pokemon.stats.forEach(stat => {
    const statName = stat.stat.name;
    const icon = statIcons[statName] || '❓';

    const statItem = document.createElement('div');
    statItem.style.display = 'flex';
    statItem.style.alignItems = 'center';
    statItem.style.gap = '10px';
    statItem.style.fontSize = '1.1rem';
    statItem.style.fontWeight = '600';

    const iconSpan = document.createElement('span');
    iconSpan.textContent = icon;
    iconSpan.style.fontSize = '1.3rem';

    const textSpan = document.createElement('span');
    textSpan.textContent = `${statName.replace(/-/g, ' ').toUpperCase()}: ${stat.base_stat}`;

    statItem.appendChild(iconSpan);
    statItem.appendChild(textSpan);

    statsGrid.appendChild(statItem);
  });

  card.appendChild(title);
  card.appendChild(imgWrapper);
  card.appendChild(statsGrid);

  container.appendChild(card);
}


function getPokemonFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('pokemon');
}

async function Load() {
  const pokemonName = getPokemonFromURL();
  if (!pokemonName) {
    document.querySelector('.body').textContent = 'No Pokémon specified.';
    return;
  }

  const pokemonDetails = await fetchPokemonDetails(pokemonName);
  displayPokemonDetails(pokemonDetails);
}


function renderEvolutionChain(evolutions) {
  const container = document.getElementById('evolution-list');
  container.innerHTML = '';

  evolutions.forEach((pokemon, index) => {
    const card = document.createElement('div');
    card.className = 'evolution-card';
    card.tabIndex = 0;

    card.onclick = () => loadPokemonInfo(pokemon.name);
    card.onkeypress = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        loadPokemonInfo(pokemon.name);
      }
    };

    const img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name + ' sprite';
    card.appendChild(img);

    const name = document.createElement('div');
    name.className = 'evolution-name';
    name.textContent = pokemon.name;
    card.appendChild(name);

    container.appendChild(card);

    if (index < evolutions.length - 1) {
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.classList.add('evolution-arrow');
      arrow.setAttribute('viewBox', '0 0 24 24');
      arrow.innerHTML = `<path d="M9 6l6 6-6 6" />`;
      container.appendChild(arrow);
    }
  });
}


Load();
