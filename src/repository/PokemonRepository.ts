import {Pokemon} from "../types/Pokemon.ts";

const POKEMON_ENDPOINT = 'pokemon';
const POKEMON_FULL_BASE_URL = `${import.meta.env.VITE_API_POKEMON_URL}/${POKEMON_ENDPOINT}`

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${POKEMON_FULL_BASE_URL}/${id}`);
    return response.json();
}

export const getPokemonsByOffsetAndLimit = async (offset: number, limit = 1): Promise<Pokemon[]> => {
    if (offset <= import.meta.env.VITE_FIRST_POKEMON_ID) {
        return getThreeFirstPokemon()
    }

    if (offset >= import.meta.env.VITE_LAST_POKEMON_ID) {
        return getThreeLastPokemon()
    }

    const startIndex = offset - 1;
    const promises: Promise<Pokemon>[] = [];
    for (let i = startIndex; i <= offset + limit; i++) {
        promises.push(getPokemonById(i));
    }

    return await Promise.all(promises);
}

const getThreeFirstPokemon = async (): Promise<Pokemon[]> => {
    const promises: Promise<Pokemon>[] = [];
    for (let i = import.meta.env.VITE_FIRST_POKEMON_ID; i <= 3; i++) {
        promises.push(getPokemonById(i));
    }

    return await Promise.all(promises);
}

const getThreeLastPokemon = async (): Promise<Pokemon[]> => {
    const promises: Promise<Pokemon>[] = [];
    for (let i = import.meta.env.VITE_LAST_POKEMON_ID - 2; i <= import.meta.env.VITE_LAST_POKEMON_ID; i++) {
        promises.push(getPokemonById(i));
    }

    return await Promise.all(promises);
}