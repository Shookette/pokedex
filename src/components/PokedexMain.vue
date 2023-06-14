<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Pokemon } from '../types/Pokemon.ts'
import { getFivePokemonsByOffset } from '../repository/PokemonRepository.ts'
import PokedexLeftPanel from './PokedexLeftPanel.vue'
import PokedexRightPanel from './PokedexRightPanel.vue'

const pokemonList = ref<Pokemon[]>([])
const currentPokemon = ref<Pokemon>()
const currentPokemonId = ref<number>(1)

onMounted(async () => {
  pokemonList.value = await getFivePokemonsByOffset(currentPokemonId.value)
})

watch(currentPokemonId, async () => {
  pokemonList.value = await getFivePokemonsByOffset(currentPokemonId.value)
})

watch(pokemonList, () => {
  currentPokemon.value = pokemonList.value.find(pokemon => pokemon.id === currentPokemonId.value)
})

type updateMode = 'increase' | 'decrease'

const updateCurrentPokemonId = (updateMode: updateMode, value: number) => {
  const newValue = updateMode === 'decrease' ? currentPokemonId.value - value : currentPokemonId.value + value

  if (updateMode === 'decrease' && newValue <= 1) {
    currentPokemonId.value = 1
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
    />
  </main>
</template>

<style lang="scss" scoped>
.pokedex {
  display: flex;
  flex-direction: row;
  min-height: inherit;
}
</style>
