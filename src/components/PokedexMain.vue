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
    <PokedexLeftPanel
      :pokemon-list="pokemonList"
      :current-pokemon="currentPokemon"
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
      :update-current-pokemon-id="updateCurrentPokemonId"
    />
    <PokedexRightPanel
      :pokemon-current-type="pokemonCurrentType"
      :pokemon-current-stat="pokemonCurrentStat"
    />
  </main>
</template>

<style lang="scss" scoped>
@use "../style.scss" as *;

.pokedex {
  display: flex;
  flex-direction: column;
  min-height: inherit;
  align-items: flex-end;

  @include medium {
    flex-direction: row;
  }
}

</style>
