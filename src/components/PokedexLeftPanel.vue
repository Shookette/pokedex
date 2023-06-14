<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'
import PokemonCard from './PokemonCard.vue'
import PokemonListCarrousel from './PokemonListCarrousel.vue'

defineProps<{
  currentPokemon: Pokemon,
  pokemonList: Pokemon[],
  handleOnClickCurrentPokemonId:(id:number) => void
}>()

</script>

<template>
  <section class="pokedex-left-panel">
    <PokemonListCarrousel
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
      :pokemon-list="pokemonList"
    />
    <PokemonCard
      :pokemon="currentPokemon"
    />
  </section>
</template>

<style lang="scss" scoped>
.pokedex-left-panel {
  display: flex;
  flex-direction: column;
  width: 50%;
  background-color: var(--color-background-red-light);
  margin: 50px 0 50px 50px;
  border-radius: 10px;
  border: 10px solid var(--color-background-red-dark);
}
</style>
