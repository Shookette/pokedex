export type Pokemon = {
    id: number;
    name: string;
    sprites: PokemonSprite;
    types: PokemonRawType[];
}

export type PokemonSprite = {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

export type PokemonRawType = {
    slot: number
    type: {
        name: PokemonType
        url: string
    }
}

export type PokemonType =
    "normal" |
    "fighting" |
    "flying" |
    "poison" |
    "ground" |
    "rock" |
    "bug" |
    "ghost" |
    "steel" |
    "fire" |
    "water" |
    "grass" |
    "electric" |
    "psychic" |
    "ice" |
    "dragon" |
    "dark" |
    "fairy" |
    "unknown" |
    "shadow";