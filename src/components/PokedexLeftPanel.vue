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
    <div class="pokedex-left-panel__design" />
    <PokemonCard
      :pokemon="currentPokemon"
    />
    <PokemonListCarrousel
      :handle-on-click-current-pokemon-id="handleOnClickCurrentPokemonId"
      :pokemon-list="pokemonList"
    />
  </section>
</template>

<style lang="scss" scoped>
.pokedex-left-panel {
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 600px;
  background-color: var(--color-background-red-light);
  margin: 50px 0 50px 50px;
  border-radius: 10px;
  border: 10px solid var(--color-background-red-dark);

  &__design {
    height: 100px;
  }
}
</style>
