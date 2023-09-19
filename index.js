const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data))
    .catch((error) => console.log(error));
}

function mostrarPokemon(data) {
  let tipos = data.types.map(
    (type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`
  );

  tipos = tipos.join("");

  console.log(tipos);

  let pokeId = data.id.toString();

  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `<p class="pokemon-id-back">#${pokeId}</p>
    <div class="pokemon-imagen">
      <img
        src="${data.sprites.other.home.front_default}"
        alt="${data.name}"
      />
    </div>
    <div class="pokemon-info">
      <div class="nombre-contenedor">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-nombre">${data.name}</h2>
      </div>
      <div class="pokemon-tipos">
      ${tipos}
      </div>
      <div class="pokemon-stats">
        <p class="stat">${data.height}m</p>
        <p class="stat">${data.weight}kg</p>
      </div>
    </div>`;
  listaPokemon.appendChild(div);
}

botonesHeader.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    //Esto es para que cada vez que se toque un btn de los tipos se borre todo y solo se muestre los de ese tipo.
    listaPokemon.innerHTML = "";

    for (let i = 0; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          const tipos = data.types.map((type) => type.type.name);

          if (botonId === "ver-todos" || tipos.includes(botonId)) {
            mostrarPokemon(data);
          }
        })
        .catch((error) => console.log(error));
    }
  })
);
