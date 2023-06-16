<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'
import PokemonItemCarrousel from './PokemonItemCarrousel.vue'

defineProps<{
  currentPokemon: Pokemon,
  pokemonList: Pokemon[],
  handleOnClickCurrentPokemonId:(currentId: number) => void
}>()
</script>

<template>
  <div class="pokemon-list-carrousel">
    <PokemonItemCarrousel
      v-for="pokemon in pokemonList"
      :key="pokemon.id"
      :is-current="pokemon.id === currentPokemon.id"
      :pokemon="pokemon"
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
    />
  </div>
</template>

<style scoped lang="scss">
.pokemon-list-carrousel {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background-grey-dark);
  margin: 20px;
  border-radius: 5px;
  justify-content: space-evenly;
}
</style>
