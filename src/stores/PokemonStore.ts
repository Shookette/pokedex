import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Pokemon } from '../types/Pokemon'
import { getPokemonByNameOrId, getMissingPokemonsByOffsetAndLimit } from '../repository/PokemonRepository'
import { updateMode } from '../types/PokedexMainType'

export const usePokemonStore = defineStore('pokemon', () => {
  const currentPokemonId = ref(1)
  const pokemons = ref<Pokemon[]>([])

  const pokemonCarrousel = computed<Pokemon[]>(() => {
    const pokemonsIndex = pokemons.value.findIndex((pokemon) => pokemon.id === currentPokemonId.value)
    if (pokemonsIndex === import.meta.env.VITE_FIRST_POKEMON_ID - 1) {
      return pokemons.value.slice(0, 3)
    }

    if (pokemonsIndex === import.meta.env.VITE_LAST_POKEMON_ID - 1) {
      return pokemons.value.slice(pokemonsIndex - 2, pokemonsIndex)
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
      currentPokemonId.value = parseInt(import.meta.env.VITE_FIRST_POKEMON_ID)
      await fetchPokemonsFromId(currentPokemonId.value)
      return
    }

    if (pokemonId >= import.meta.env.VITE_LAST_POKEMON_ID) {
      currentPokemonId.value = parseInt(import.meta.env.VITE_LAST_POKEMON_ID)
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

    if (updateMode === 'decrease' && newValue <= import.meta.env.VITE_FIRST_POKEMON_ID) {
      currentPokemonId.value = parseInt(import.meta.env.VITE_FIRST_POKEMON_ID)
      return
    }

    if (updateMode === 'increase' && newValue >= import.meta.env.VITE_LAST_POKEMON_ID) {
      currentPokemonId.value = parseInt(import.meta.env.VITE_LAST_POKEMON_ID)
      return
    }

    currentPokemonId.value = newValue
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const getRandomPokemon = async () => {
    const minPokemonID = import.meta.env.VITE_FIRST_POKEMON_ID
    const maxPokemonId = import.meta.env.VITE_LAST_POKEMON_ID
    currentPokemonId.value = Math.floor(Math.random() * (maxPokemonId - minPokemonID + 1) + minPokemonID)
    await fetchPokemonsFromId(currentPokemonId.value)
  }

  const fetchPokemonsFromId = async (id: number) => {
    const pokemonsResult = await getMissingPokemonsByOffsetAndLimit(id, pokemons.value)
    pokemons.value = [...pokemons.value, ...pokemonsResult]

    console.log('pokemons.value::', pokemons.value)
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
