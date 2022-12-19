const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const pokemonForm = document.querySelector('.form');
const pokemonInput = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let procurarPokemon = 1;

const acharPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await acharPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonInput.value = '';
        procurarPokemon = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokémon not found';
        pokemonNumber.innerHTML = '';
    }
}

pokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());
});
buttonPrev.addEventListener('click', () => {
    if(procurarPokemon > 1){
    procurarPokemon -= 1;
    renderPokemon(procurarPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);