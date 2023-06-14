<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'

defineProps<{
  pokemonList: Pokemon[],
  handleOnClickCurrentPokemonId:(number) => void
}>()
</script>

<template>
  <div class="pokemon-list-carrousel">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.id"
      @click="() => handleOnClickCurrentPokemonId(pokemon.id)"
    >
      <span>{{ pokemon.name }}</span>
      <img :src="pokemon.sprites.front_default">
    </div>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list-carrousel {
  display: flex;
  flex-direction: row;
}
</style>
