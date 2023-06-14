<script setup lang="ts">
import { Pokemon } from '../types/Pokemon.ts'

defineProps<{ pokemon: Pokemon }>()
</script>

<template>
  <article class="pokemon-card">
    <img
      class="pokemon-card__sprite"
      :src="pokemon?.sprites?.front_default || ''"
      alt="Sprites showing the front design of the current pokemon"
    >
    <h2 class="pokemon-card__title">
      {{ pokemon?.id }} - {{ pokemon?.name }}
    </h2>
  </article>
</template>

<style lang="scss" scoped>
.pokemon-card {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 20px 50px;
  background-color: var(--color-background-grey-light);
  border-radius: 20px 20px 20px 50px;

  &__sprite {
    width: 200px;
    height: auto;
    margin: auto;
  }

  &__title {
    color: var(--color-title)
  }
}
</style>
