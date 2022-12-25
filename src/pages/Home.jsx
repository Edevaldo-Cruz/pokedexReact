import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavbarApp from "../components/NavbarApp/Index";
import PokemonCard from "../components/PokemonCard/Index";
import Skeletons from "../components/Skeletons/Index";

export const Home = () => {
  const [pokemons, setPokemons] = useState([]);

  //Obtem os dados quando a tela é construida.
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    var endpoints = [];
    for (var i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    axios
      .all(endpoints.map((endpont) => axios.get(endpont)))
      .then((res) => setPokemons(res).catch((err) => console.log(err)));

    // axios
    //   .get("https://pokeapi.co/api/v2/pokemon?limit=50")
    //   .then((res) =>
    //     setPokemons(res.data.results).catch((err) => console.log(err))
    //   );
  };

  const pokemonFilter = (name) => {
    var filteredPokemons = [];
    if (name === "") {
      getPokemons();
    }
    for (var i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }
    setPokemons(filteredPokemons);
  };

  return (
    <div>
      <NavbarApp pokemonFilter={pokemonFilter} />
      <Container maxWidth="false">
        {pokemons.length === 0 ? (
          <Skeletons />
        ) : (
          <Grid container spacing={3}>
            {pokemons.map((pokemon, key) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                <PokemonCard
                  name={pokemon.data.name}
                  image={pokemon.data.sprites.front_default}
                  types={pokemon.data.types}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};
