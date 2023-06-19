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

const pokemonCurrentType = computed(() =>
  currentPokemon.value?.types.map(type => type.type.name)
)

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
    />
    <PokedexRightPanel
      :update-current-pokemon-id="updateCurrentPokemonId"
      :pokemon-current-type="pokemonCurrentType"
    />
  </main>
</template>

<style lang="scss" scoped>
.pokedex {
  display: flex;
  flex-direction: row;
  min-height: inherit;
  align-items: flex-end;
}
</style>
