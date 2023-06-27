<script setup lang="ts">
import { PokemonType } from '../types/Pokemon.ts'
import { computed } from 'vue'

const props = defineProps<{
  pokemonType: PokemonType
  active?: boolean
}>()

const pokemonTypeItemClassnames = computed(() => {
  const classnames = []
  classnames.push(`pokemon-type-item--${props.pokemonType}`)
  if (props.active) {
    classnames.push('pokemon-type-item--active')
  }
  return classnames
})
</script>

<template>
  <article class="pokemon-type-item" :class="pokemonTypeItemClassnames">
    <img
      v-if="pokemonType !== 'unknown' && pokemonType !== 'shadow'"
      class="pokemon-type-item__image"
      :src="`${pokemonType}.svg`"
      :alt="`pokemon type ${pokemonType}`"
    />
    <h2 class="pokemon-type-item__title">
      {{ pokemonType }}
    </h2>
  </article>
</template>

<style scoped lang="scss">
.pokemon-type-item {
  display: flex;
  flex-direction: row;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 20px;
  opacity: 0.5;
  --pokemon-type-background-color: #ffffff;
  background-color: var(--pokemon-type-background-color);

  &--normal {
    --pokemon-type-background-color: #a1a2a1;
  }

  &--fighting {
    --pokemon-type-background-color: #ef8833;
  }

  &--flying {
    --pokemon-type-background-color: #8eb9eb;
  }

  &--poison {
    --pokemon-type-background-color: #8844c5;
  }

  &--ground {
    --pokemon-type-background-color: #895328;
  }

  &--rock {
    --pokemon-type-background-color: #afab86;
  }

  &--bug {
    --pokemon-type-background-color: #95a236;
  }

  &--ghost {
    --pokemon-type-background-color: #6a416e;
  }

  &--steel {
    --pokemon-type-background-color: #6fa1b7;
  }

  &--fire {
    --pokemon-type-background-color: #d43a31;
  }

  &--water {
    --pokemon-type-background-color: #427fe8;
  }

  &--grass {
    --pokemon-type-background-color: #5aa03b;
  }

  &--electric {
    --pokemon-type-background-color: #f1c442;
  }

  &--psychic {
    --pokemon-type-background-color: #dd4e7a;
  }

  &--ice {
    --pokemon-type-background-color: #70d6fb;
  }

  &--dragon {
    --pokemon-type-background-color: #525fda;
  }

  &--dark {
    --pokemon-type-background-color: #4c3f3d;
  }

  &--fairy {
    --pokemon-type-background-color: #e078e9;
  }

  &--unknown {
    --pokemon-type-background-color: #73998e;
  }

  &--shadow {
    --pokemon-type-background-color: #45454a;
  }

  &--active {
    opacity: 1;
  }

  &__image {
    width: 16px;
    height: 16px;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-background-white);
    margin: 0;
  }
}
</style>
