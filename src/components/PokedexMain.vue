<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Pokemon } from '../types/Pokemon.ts'
import { getPokemonsByOffsetAndLimit } from '../repository/PokemonRepository.ts'
import PokedexLeftPanel from './PokedexLeftPanel.vue'
import PokedexRightPanel from './PokedexRightPanel.vue'
import { updateMode } from '../types/PokedexMainType.ts'

const pokemonList = ref<Pokemon[]>([])
const currentPokemon = ref<Pokemon>()
const currentPokemonId = ref<number>(1)

onMounted(async () => {
  pokemonList.value = await getPokemonsByOffsetAndLimit(currentPokemonId.value)
})

watch(currentPokemonId, async () => {
  pokemonList.value = await getPokemonsByOffsetAndLimit(currentPokemonId.value)
})

watch(pokemonList, () => {
  currentPokemon.value = pokemonList.value.find(pokemon => pokemon.id === currentPokemonId.value)
})

const pokemonCurrentType = computed(() => {
  if (!currentPokemon.value) {
    return []
  }

  return currentPokemon.value?.types.map(type => type.type.name)
})

const pokemonCurrentStat = computed(() => {
  if (!currentPokemon.value) {
    return []
  }

  return currentPokemon.value?.stats.map(stat => stat.base_stat)
})

const updateCurrentPokemonId = (updateMode: updateMode, value: number) => {
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
}

const handleOnClickCurrentPokemonId = (id: number) => {
  currentPokemonId.value = id
}

</script>

<template>
  <main class="pokedex">
    <div class="pokedex__layout">
      <PokedexLeftPanel
        :pokemon-list="pokemonList"
        :current-pokemon="currentPokemon"
        :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
        :update-current-pokemon-id="updateCurrentPokemonId"
      />
      <div class="pokedex__layout__center" />
      <PokedexRightPanel
        :pokemon-current-type="pokemonCurrentType"
        :pokemon-current-stat="pokemonCurrentStat"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "../style.scss" as *;

.pokedex {
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: inherit;
  align-items: center;
  justify-content: center;

  &__layout {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: inherit;

    @include medium {
      flex-direction: row;
    }

    @include medium {
      &__center {
        height: 600px;
        width: 20px;
        margin-bottom: 50px;
        background-color: var(--color-background-red-dark);
        box-shadow: inset 0 1px 5px 2px black;
        z-index: 10;
      }
    }

  }

}

</style>
