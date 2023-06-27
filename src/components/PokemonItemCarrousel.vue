<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'

defineProps<{
  pokemon: Pokemon
  isCurrent: boolean
  handleOnClickCurrentPokemonId: (currentId: number) => void
}>()
</script>

<template>
  <div
    class="pokemon-item-carrousel"
    :class="{ 'pokemon-item-carrousel--current': isCurrent }"
    @click="() => handleOnClickCurrentPokemonId(pokemon.id)"
  >
    <span class="pokemon-item-carrousel__name">{{ pokemon?.name }}</span>
    <img
      class="pokemon-item-carrousel__image"
      :src="pokemon?.sprites?.front_default || ''"
      alt="Pokemon front sprites"
    />
  </div>
</template>

<style scoped lang="scss">
.pokemon-item-carrousel {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  cursor: pointer;

  &--current {
    .pokemon-item-carrousel__name {
      text-decoration: underline;
      font-weight: bold;
      font-size: 12px;
    }
  }

  &__name {
    font-size: 10px;
  }

  &__image {
    width: 50px;
    height: 50px;
    scale: 1.4;
  }
}
</style>
