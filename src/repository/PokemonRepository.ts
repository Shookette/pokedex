import {Pokemon} from "../types/Pokemon.ts";

const POKEMON_ENDPOINT = 'pokemon';
const POKEMON_FULL_BASE_URL = `${import.meta.env.VITE_API_POKEMON_URL}/${POKEMON_ENDPOINT}`

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${POKEMON_FULL_BASE_URL}/${id}`);
    return response.json();
}

export const getFivePokemonsByOffset = async (offset: number): Promise<Pokemon[]> => {
    const startIndex = offset === 1 ? 1 : offset - 1;
    const limit = offset === 1 ? 1 : 2;
    const promises: Promise<Pokemon>[] = [];
    for (let i = startIndex; i <= startIndex + limit; i++) {
        promises.push(getPokemonById(i));
    }

    return await Promise.all(promises);
}