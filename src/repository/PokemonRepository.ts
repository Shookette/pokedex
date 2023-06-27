import { Pokemon } from '../types/Pokemon.ts'

const POKEMON_ENDPOINT = 'pokemon'
const POKEMON_FULL_BASE_URL = `${import.meta.env.VITE_API_POKEMON_URL}/${POKEMON_ENDPOINT}`

export const getPokemonById = async (id: number): Promise<Pokemon> => {
  const response = await fetch(`${POKEMON_FULL_BASE_URL}/${id}`)
  return response.json()
}

export const getPokemonByNameOrId = async (searchString: string): Promise<Pokemon> => {
  const response = await fetch(`${POKEMON_FULL_BASE_URL}/${searchString}`)
  return response.json()
}

export const getMissingPokemonsByOffsetAndLimit = async (offset: number, list: Pokemon[] = [], limit = 10): Promise<Pokemon[]> => {
  if (offset <= import.meta.env.VITE_FIRST_POKEMON_ID) {
    return getTenFirstMissingPokemon(list)
  }

  if (offset >= import.meta.env.VITE_LAST_POKEMON_ID) {
    return getTenLastMissingPokemon(list)
  }

  const startIndex = Math.max(import.meta.env.VITE_FIRST_POKEMON_ID, offset - limit / 2)
  const lastIndex = Math.min(import.meta.env.VITE_LAST_POKEMON_ID, offset + limit / 2)
  const promises: Promise<Pokemon>[] = []
  for (let i = startIndex; i <= lastIndex; i++) {
    if (list.find((pokemon) => pokemon.id === i)) {
      continue
    }
    promises.push(getPokemonById(i))
  }

  return await Promise.all(promises)
}

const getTenFirstMissingPokemon = async (list: Pokemon[] = []): Promise<Pokemon[]> => {
  const promises: Promise<Pokemon>[] = []
  for (let i = import.meta.env.VITE_FIRST_POKEMON_ID; i <= 10; i++) {
    if (list.find((pokemon) => pokemon.id === i)) {
      continue
    }
    promises.push(getPokemonById(i))
  }

  return await Promise.all(promises)
}

const getTenLastMissingPokemon = async (list: Pokemon[] = []): Promise<Pokemon[]> => {
  const promises: Promise<Pokemon>[] = []
  for (let i = import.meta.env.VITE_LAST_POKEMON_ID - 9; i <= import.meta.env.VITE_LAST_POKEMON_ID; i++) {
    if (list.find((pokemon) => pokemon.id === i)) {
      continue
    }
    promises.push(getPokemonById(i))
  }

  return await Promise.all(promises)
}
