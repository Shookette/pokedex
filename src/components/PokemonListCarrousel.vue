<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'

defineProps<{
  pokemonList: Pokemon[],
  handleOnClickCurrentPokemonId:(currentId: number) => void
}>()
</script>

<template>
  <div class="pokemon-list-carrousel">
    <div
      v-for="pokemon in pokemonList"
      :key="pokemon.id"
      class="pokemon-item-carrousel"
      @click="() => handleOnClickCurrentPokemonId(pokemon.id)"
    >
      <span class="pokemon-item-carrousel__name">{{ pokemon?.name }}</span>
      <img
        class="pokemon-item-carrousel__image"
        :src="pokemon?.sprites?.front_default || ''"
        alt="Pokemon front sprites"
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.pokemon-list-carrousel {
  display: flex;
  flex-direction: row;
  background-color: var(--color-background-grey-dark);
  margin: 10px;
  border-radius: 5px;
}

.pokemon-item-carrousel {
  &__name {
    font-size: 10px;
  }

  &__image {
    width: 50px;
    height: 50px;
  }
}
</style>
