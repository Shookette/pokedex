import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Pokemon } from '../types/Pokemon'
import { getPokemonByNameOrId, getMissingPokemonsByOffsetAndLimit } from '../repository/PokemonRepository'
import { updateMode } from '../types/PokedexMainType'

export const usePokemonStore = defineStore('pokemon', () => {
  const currentPokemonId = ref(1)
  const pokemons = ref<Pokemon[]>([])

  const minIdPokemon = parseInt(import.meta.env.VITE_FIRST_POKEMON_ID)
  const maxIdPokemon = parseInt(import.meta.env.VITE_LAST_POKEMON_ID)

  const pokemonCarrousel = computed<Pokemon[]>(() => {
    const pokemonsIndex = pokemons.value.findIndex((pokemon) => pokemon.id === currentPokemonId.value)
    if (currentPokemonId.value === minIdPokemon) {
      return pokemons.value.slice(0, 3)
    }

    if (currentPokemonId.value === maxIdPokemon) {
      return pokemons.value.slice(pokemonsIndex - 2, pokemonsIndex + 1)
    }

    return pokemons.value.slice(pokemonsIndex - 1, pokemonsIndex + 2)
  })

  const pokemon = computed(() => pokemons.value.find((pokemon) => pokemon.id === currentPokemonId.value))

  const pokemonType = computed(() => {
    if (!pokemon.value) {
      return []
    }

    return pokemon.value?.types.map((type) => type.type.name)
  })

  const pokemonStat = computed(() => {
    if (!pokemon.value) {
      return []
    }

    return pokemon.value?.stats.map((stat) => stat.base_stat)
  })

  const getPokemonById = async (pokemonId: number) => {
    if (pokemonId <= import.meta.env.VITE_FIRST_POKEMON_ID) {
      currentPokemonId.value = minIdPokemon
      await fetchPokemonsFromId(currentPokemonId.value)
      return
    }

    if (pokemonId >= import.meta.env.VITE_LAST_POKEMON_ID) {
      currentPokemonId.value = maxIdPokemon
      await fetchPokemonsFromId(currentPokemonId.value)
      return
    }

    currentPokemonId.value = pokemonId
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const getPokemonBySearchString = async (searchString: string) => {
    const pokemon = await getPokemonByNameOrId(searchString)
    if (!pokemon || !pokemon.id) {
      return
    }

    currentPokemonId.value = pokemon.id
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const updateCurrentPokemonId = async (updateMode: updateMode, value: number) => {
    const newValue = updateMode === 'decrease' ? currentPokemonId.value - value : currentPokemonId.value + value

    if (updateMode === 'decrease' && newValue <= minIdPokemon) {
      currentPokemonId.value = minIdPokemon
      return
    }

    if (updateMode === 'increase' && newValue >= maxIdPokemon) {
      currentPokemonId.value = maxIdPokemon
      return
    }

    currentPokemonId.value = newValue
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const getRandomPokemon = async () => {
    currentPokemonId.value = Math.floor(Math.random() * (maxIdPokemon - minIdPokemon + 1) + minIdPokemon)
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const fetchPokemonsFromId = async (id: number) => {
    const pokemonsResult = await getMissingPokemonsByOffsetAndLimit(id, pokemons.value)
    pokemons.value = [...pokemons.value, ...pokemonsResult].sort((a: Pokemon, b: Pokemon) => a.id - b.id)
  }

  return {
    currentPokemonId,
    pokemons,
    pokemon,
    pokemonType,
    pokemonCarrousel,
    pokemonStat,
    getPokemonBySearchString,
    getRandomPokemon,
    updateCurrentPokemonId,
    getPokemonById,
  }
})
